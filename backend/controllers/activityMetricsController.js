const asyncHandler = require("express-async-handler");
const Activity = require("../models/activityModel");
const Community = require("../models/communityModel");
const Session = require("../models/sessionModel");
const Attendance = require("../models/attendanceModel");

const getActivityMetrics = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.findOne({ name: req.params.name });
    const activityId = activity._id;

    // 1. top end cumulative metrics
    const totalCommunities = await Session.distinct("community_id", {
      activity_id: activityId,
    });

    const totalSessions = await Session.find({
      activity_id: activityId,
    });
    const sessionIds = await Session.find({ activity_id: activityId }, "_id");
    const sessionIdArray = sessionIds.map((session) => session._id);

    const totalBeneficiaries = await Attendance.distinct("beneficiary_id", {
      session_id: { $in: sessionIdArray },
    });

    //2. additional attendance based metrics

    //2.1 Community wise attendance for the activity across multiple sessions

    const communitySession = {};

    for (const session of totalSessions) {
      const sessionId = session._id;
      const attendanceRecords = await Attendance.find({
        session_id: sessionId,
      });
      const digitRegex = /\d+$/;
      const sessionNumber = parseInt(session.name.match(digitRegex)[0]);
      
      const communityName = await Community.findOne({_id: session.community_id}, "name");
      if(communitySession[communityName.name] === undefined){
        communitySession[communityName.name] = [];
        communitySession[communityName.name][sessionNumber] = attendanceRecords.length;
        
      }
      else{
        communitySession[communityName.name][sessionNumber] = attendanceRecords.length;
      }
      
      
    }

    res.status(200).json({
      totalCommunities: totalCommunities.length,
      totalSessions: totalSessions.length,
      totalBeneficiaries: totalBeneficiaries.length,
      communitySession: communitySession,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

module.exports = { getActivityMetrics };
