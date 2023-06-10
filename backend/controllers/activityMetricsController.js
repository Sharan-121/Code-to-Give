const asyncHandler = require("express-async-handler");
const Activity = require("../models/activityModel");
const Session = require("../models/sessionModel");
const Attendance = require("../models/attendanceModel");

const getActivityMetrics = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.findOne({ name: req.params.name });
    const activityId = activity._id;

    const totalCommunities = await Session.distinct("community_id", {
      activity_id: activityId,
    });

    const totalSessions = await Session.find({ activity_id: activityId });

    const sessionIds = await Session.find({ activity_id: activityId }, "_id");
    const sessionIdArray = sessionIds.map((session) => session._id);

    const totalBeneficiaries = await Attendance.distinct("beneficiary_id", {
      session_id: { $in: sessionIdArray },
    });

    res.status(200).json({
      totalCommunities: totalCommunities.length,
      totalSessions: totalSessions.length,
      totalBeneficiaries: totalBeneficiaries.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const followUpsCompleted = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const activityName = req.params.activityName;
    const activity = await Activity.findOne({ name: activityName });
    const sessions = await Session.find({ activity_id: activity._id });
    let result = 0;
    for (let session of sessions) {
      const attendances = await Attendance.find({
        session_id: session._id,
        followUp_status: true,
      });
      result += attendances.length;
    }
    res.status(200).json({ "Successful Follow Ups": result });
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

module.exports = { getActivityMetrics, followUpsCompleted };
