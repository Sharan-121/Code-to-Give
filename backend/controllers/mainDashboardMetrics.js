const asyncHandler = require("express-async-handler");
const Community = require("../models/communityModel");
const Session = require("../models/sessionModel");
const Attendance = require("../models/attendanceModel");
const Activity = require("../models/activityModel");
const Beneficiary = require("../models/beneficiaryModel");

const isTimeInBetween = (start, end, current) => {
  const startYear = start.getFullYear();
  const startMonth = start.getMonth() + 1;
  const endYear = end.getFullYear();
  const endMonth = end.getMonth() + 1;
  const currentYear = current.getFullYear();
  const currentMonth = current.getMonth() + 1;

  if (currentYear > startYear && currentYear < endYear) {
    return true;
  } else if (currentYear === startYear && currentYear === endYear) {
    if (currentMonth >= startMonth && currentMonth <= endMonth) {
      return true;
    }
  } else if (currentYear === startYear) {
    if (currentMonth >= startMonth) {
      return true;
    }
  } else if (currentYear === endYear) {
    if (currentMonth <= endMonth) {
      return true;
    }
  }

  return false;
};

const sessionCountCommunityWiseTimePeriod = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    try {
      let timePeriod = req.params.timePeriod;
      timePeriod = timePeriod.split("-");
      let start = new Date();
      start.setFullYear(parseInt(timePeriod[0].split(".")[0]));
      start.setMonth(parseInt(timePeriod[0].split(".")[1]) - 1);
      let end = new Date();
      end.setFullYear(parseInt(timePeriod[1].split(".")[0]));
      end.setMonth(parseInt(timePeriod[1].split(".")[1]) - 1);

      let sessionCount = {};
      const sessions = await Session.find();

      for (const session of sessions) {
        if (isTimeInBetween(start, end, session.date)) {
          const community = await Community.findById(session.community_id);
          if (sessionCount[community.name] === undefined) {
            sessionCount[community.name] = 0;
          }
          sessionCount[community.name]++;
        }
      }

      res.status(200).json(sessionCount);
    } catch (error) {
      res.status(400);
      throw new Error(
        "Invalid time period format! Expected format: yyyy.mm-yyyy.mm (start-end)"
      );
    }
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const beneficiaryCountActivityWise = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    let beneficiaryCount = {};
    const sessions = await Session.find();

    for (const session of sessions) {
      const attendances = await Attendance.find({ session_id: session._id });
      const activity = await Activity.findById(session.activity_id);
      if (beneficiaryCount[activity.name] === undefined) {
        beneficiaryCount[activity.name] = 0;
      }
      beneficiaryCount[activity.name] += attendances.length;
    }

    res.status(200).json(beneficiaryCount);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

module.exports = {
  sessionCountCommunityWiseTimePeriod,
  beneficiaryCountActivityWise,
};
