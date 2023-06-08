const asyncHandler = require("express-async-handler");
const Community = require("../models/communityModel");
const Session = require("../models/sessionModel");
const Attendance = require("../models/attendanceModel");
const Activity = require("../models/activityModel");
const Beneficiary = require("../models/beneficiaryModel");

const communityWiseBeneficiary = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.findOne({ name: req.params.name });
    const activityId = activity._id;
    const sessionIds = await Session.find({ activity_id: activityId }, "_id");
    const sessionIdArray = sessionIds.map((session) => session._id);
    const totalBeneficiaries = await Attendance.distinct("beneficiary_id", {
      session_id: { $in: sessionIdArray },
    });

    const communityWiseBeneficiaries = {}; // Metric

    // Community wise total beneficiaries for the activity
    for (const beneficiary of totalBeneficiaries) {
      const person = await Beneficiary.findById({ _id: beneficiary });
      const community = person.community;
      if (communityWiseBeneficiaries[community] === undefined) {
        communityWiseBeneficiaries[community] = 1;
      } else {
        communityWiseBeneficiaries[community] += 1;
      }
    }

    res.status(200).json(
      communityWiseBeneficiaries,
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = { communityWiseBeneficiary};
