const asyncHandler = require("express-async-handler");
const Activity = require("../models/activityModel");
const Community = require("../models/communityModel");
const Session = require("../models/sessionModel");
const Attendance = require("../models/attendanceModel");

const getActivityMetrics = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.findOne({ name: req.params.name });
    const activityId = activity._id;

    const totalCommunities = await Session.distinct("community_id", {
      activity_id: activityId,
    })

    
    const totalSessions = await Session.countDocuments({
      activity_id: activityId,
    });
    const sessionIds = await Session.find({ activity_id: activityId }, "_id");
    const sessionIdArray = sessionIds.map((session) => session._id);

    const totalBeneficiaries = await Attendance.distinct("beneficiary_id", {
      session_id: { $in: sessionIdArray },
    });

    res.status(200).json({
      totalCommunities: totalCommunities.length,
      totalSessions: totalSessions,
      totalBeneficiaries: totalBeneficiaries.length,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Server Error");
  }
});

module.exports = { getActivityMetrics };
