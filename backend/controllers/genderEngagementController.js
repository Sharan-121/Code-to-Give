const asyncHandler = require("express-async-handler");
const Community = require("../models/communityModel");
const Session = require("../models/sessionModel");
const Attendance = require("../models/attendanceModel");
const Activity = require("../models/activityModel");
const Beneficiary = require("../models/beneficiaryModel");

const getAge = (birthDate) => {
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const genderAndCommunityWiseEngagement = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const activityName = req.params.activityName;
    const activity = await Activity.findOne({ name: activityName });
    const sessions = await Session.find({ activity_id: activity._id });

    let eligibleSet = new Set();
    let attendedSet = new Set();

    let metrics = {};

    for (const session of sessions) {
      const community = await Community.findById(session.community_id);
      const communityName = community.name;
      const beneficiaries = await Beneficiary.find({
        community: communityName,
      });

      for (const beneficiary of beneficiaries) {
        const age = getAge(beneficiary.dob);
        if (
          !eligibleSet.has(beneficiary._id.toString()) &&
          age >= session.minAge &&
          age <= session.maxAge &&
          session.gender.includes(beneficiary.gender)
        ) {
          eligibleSet.add(beneficiary._id.toString());

          if (metrics[communityName] === undefined) {
            metrics[communityName] = {
              male: [0, 0],
              female: [0, 0],
              other: [0, 0],
            };
          }

          metrics[communityName][beneficiary.gender][1]++;
        }
      }

      const attendances = await Attendance.find({ session_id: session._id });
      for (const attendance of attendances) {
        const beneficiary = await Beneficiary.findById(
          attendance.beneficiary_id
        );
        if (!attendedSet.has(beneficiary._id.toString())) {
          attendedSet.add(beneficiary._id.toString());
          metrics[communityName][beneficiary.gender][0]++;
        }
      }
    }

    res.status(200).json(metrics);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const genderAndSessionWiseCount = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    let result = { all: [], male: [], female: [], other: [] };
    const activity = await Activity.findOne({ name: req.params.activityName });
    const sessions = await Session.find({ activity_id: activity._id });

    for (const session of sessions) {
      const sessionParts = session.name.split("-");
      const num = parseInt(sessionParts[sessionParts.length - 1]);
      const attendances = await Attendance.find({ session_id: session._id });
      for (const attendance of attendances) {
        const beneficiary = await Beneficiary.findById(
          attendance.beneficiary_id
        );
        if (result.all[num - 1] === undefined) {
          result.all[num - 1] = 0;
          result.male[num - 1] = 0;
          result.female[num - 1] = 0;
          result.other[num - 1] = 0;
        }
        result.all[num - 1]++;
        result[beneficiary.gender][num - 1]++;
      }
    }
    res.status(200).json(result);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

module.exports = {
  genderAndCommunityWiseEngagement,
  genderAndSessionWiseCount,
};
