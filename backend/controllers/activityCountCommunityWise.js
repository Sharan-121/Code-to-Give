const asyncHandler = require("express-async-handler");
const Community = require("../models/communityModel");
const Session = require("../models/sessionModel");
const Attendance = require("../models/attendanceModel");
const Activity = require("../models/activityModel");
const Beneficiary = require("../models/beneficiaryModel");

const activityCountForCommunity = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    let activityCount = {};
    const sessions = await Session.find();
    let visited = new Set();

    for (const session of sessions) {
      const key = `${session.community_id}-${session.activity_id}`;
      if (!visited.has(key)) {
        visited.add(key);
        const community = await Community.findById(session.community_id);
        if (activityCount[community.name] === undefined) {
          activityCount[community.name] = 0;
        }
        activityCount[community.name]++;
      }
    }

    res.status(200).json(activityCount);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

module.exports = { activityCountForCommunity };
