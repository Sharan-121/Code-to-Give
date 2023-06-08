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

const ageAndCommunityWiseEngagement = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const activityName = req.params.activityName;
    const activity = await Activity.findOne({ name: activityName });
    const sessions = await Session.find({ activity_id: activity._id });

    let eligibleSet = new Set();
    let attendedSet = new Set();

    let metrics = {};

    let ageGroupAttendance = {
      "0-8": [0, 0],
      "9-16": [0, 0],
      "17-27": [0, 0],
      "28-40": [0, 0],
      "41-60": [0, 0],
      "61+": [0, 0],
    };

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
            metrics[communityName] = JSON.parse(
              JSON.stringify(ageGroupAttendance)
            );
          }

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

          metrics[communityName][ageGroup][1]++;
        }
      }

      const attendances = await Attendance.find({ session_id: session._id });
      for (const attendance of attendances) {
        const beneficiary = await Beneficiary.findById(
          attendance.beneficiary_id
        );
        if (!attendedSet.has(beneficiary._id.toString())) {
          attendedSet.add(beneficiary._id.toString());
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

          metrics[communityName][ageGroup][0]++;
        }
      }
    }

    res.status(200).json(metrics);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

module.exports = { ageAndCommunityWiseEngagement };
