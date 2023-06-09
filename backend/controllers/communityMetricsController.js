const asyncHandler = require("express-async-handler");
const Community = require("../models/communityModel");
const Session = require("../models/sessionModel");
const Attendance = require("../models/attendanceModel");
const Activity = require("../models/activityModel");
const Beneficiary = require("../models/beneficiaryModel");

const getCommunityMetrics = asyncHandler(async (req, res) => {
  try {
    const community = await Community.findOne({ name: req.params.name });
    const community_id = community._id;

    const totalSessionID = await Session.find(
      { community_id: community_id },
      "_id"
    );
    const totalActivity = await Session.distinct("activity_id", {
      community_id: community_id,
    });
    const sessionIdArray = totalSessionID.map((session) => session._id);

    const totalBeneficiaries = await Attendance.distinct("beneficiary_id", {
      session_id: { $in: sessionIdArray },
    });

    res.status(200).json({
      totalSessions: totalSessionID.length,
      totalActivity: totalActivity.length,
      totalBeneficiaries: totalBeneficiaries.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { getCommunityMetrics };
