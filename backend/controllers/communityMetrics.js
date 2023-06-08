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

const ageDistributionCommunity = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const communityName = req.params.communityName;
    const beneficiaries = await Beneficiary.find({ community: communityName });

    let ageDistribution = {
      "0-8": 0,
      "9-16": 0,
      "17-27": 0,
      "28-40": 0,
      "41-60": 0,
      "61+": 0,
    };

    for (const beneficiary of beneficiaries) {
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

      ageDistribution[ageGroup]++;
    }

    res.status(200).json(ageDistribution);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const genderDistributionCommunity = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const communityName = req.params.name;
    const beneficiaries = await Beneficiary.find({ community: communityName });

    let genderDistribution = {
      male: 0,
      female: 0,
      other: 0,
    };

    for (const beneficiary of beneficiaries) {
      genderDistribution[beneficiary.gender]++;
    }

    res.status(200).json(genderDistribution);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const activeBeneficiariesCommunity = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const communityName = req.params.name;
    const beneficiaries = await Beneficiary.find({ community: communityName });

    let participationDetails = {
      active: 0,
      total: 0,
    };

    for (const beneficiary of beneficiaries) {
      const participation = await Attendance.findOne({
        beneficiary_id: beneficiary._id,
      });

      if (participation) {
        participationDetails.active++;
      }
      participationDetails.total++;
    }

    res.status(200).json(participationDetails);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const activityAttendanceCountCommunity = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const communityName = req.params.name;
    const community = await Community.findOne({ name: communityName });
    const sessions = await Session.find({ community_id: community._id });

    let activityParticipation = {};
    let attendedSet = new Set();

    for (const session of sessions) {
      const attendances = await Attendance.find({
        session_id: session._id,
      });

      const activity = await Activity.findById(session.activity_id);

      for (const attendance of attendances) {
        const beneficiary = await Beneficiary.findById(
          attendance.beneficiary_id
        );

        if (!attendedSet.has(beneficiary._id.toString())) {
          attendedSet.add(beneficiary._id.toString());
          if (activityParticipation[activity.name] === undefined) {
            activityParticipation[activity.name] = 0;
          }
          activityParticipation[activity.name]++;
        }
      }
    }

    res.status(200).json(activityParticipation);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

module.exports = {
  ageDistributionCommunity,
  genderDistributionCommunity,
  activeBeneficiariesCommunity,
  activityAttendanceCountCommunity,
};
