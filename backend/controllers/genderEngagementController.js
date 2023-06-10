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
    let result = {};
    let temp = { all: [], male: [], female: [], other: [] };

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
        if (result[beneficiary.community] === undefined) {
          result[beneficiary.community] = {
            all: [],
            male: [],
            female: [],
            other: [],
          };
        }
        if (result[beneficiary.community].all[num - 1] === undefined) {
          result[beneficiary.community].all[num - 1] = 0;
          result[beneficiary.community].male[num - 1] = 0;
          result[beneficiary.community].female[num - 1] = 0;
          result[beneficiary.community].other[num - 1] = 0;
        }
        result[beneficiary.community].all[num - 1]++;
        result[beneficiary.community][beneficiary.gender][num - 1]++;
      }
    }
    res.status(200).json(result);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const ageAndSessionWiseCount = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    let result = {};
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
        if (result[beneficiary.community] === undefined) {
          result[beneficiary.community] = {
            all: [],
            "0-8": [],
            "9-16": [],
            "17-27": [],
            "28-40": [],
            "41-60": [],
            "61+": [],
          };
        }
        if (result[beneficiary.community].all[num - 1] === undefined) {
          result[beneficiary.community].all[num - 1] = 0;
          result[beneficiary.community]["0-8"][num - 1] = 0;
          result[beneficiary.community]["9-16"][num - 1] = 0;
          result[beneficiary.community]["17-27"][num - 1] = 0;
          result[beneficiary.community]["28-40"][num - 1] = 0;
          result[beneficiary.community]["41-60"][num - 1] = 0;
          result[beneficiary.community]["61+"][num - 1] = 0;
        }
        const age = getAge(beneficiary.dob);
        let ageGroup = "";
        if (age <= 8) {
          ageGroup = "0-8";
        } else if (9 <= age && age <= 16) {
          ageGroup = "9-16";
        } else if (17 <= age && age <= 27) {
          ageGroup = "17-27";
        } else if (28 <= age && age <= 40) {
          ageGroup = "28-40";
        } else if (41 <= age && age <= 60) {
          ageGroup = "41-60";
        } else {
          ageGroup = "61+";
        }
        result[beneficiary.community].all[num - 1]++;
        result[beneficiary.community][ageGroup][num - 1]++;
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
  ageAndSessionWiseCount,
};
