const asyncHandler = require("express-async-handler");
const Community = require("../models/communityModel");
const Session = require("../models/sessionModel");
const Attendance = require("../models/attendanceModel");
const Activity = require("../models/activityModel");
const Beneficiary = require("../models/beneficiaryModel");

const sessionAgeGender = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const session = await Session.findOne({ name: req.params.name });
    const attendances = await Attendance.find({ session_id: session._id });
    let ageWise = {
      "0-8": 0,
      "9-16": 0,
      "17-27": 0,
      "28-40": 0,
      "41-60": 0,
      "61+": 0,
    };
    let genderWise = { male: 0, female: 0, other: 0 };
    for (const attendance of attendances) {
      const beneficiary = await Beneficiary.findById(attendance.beneficiary_id);
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
      ageWise[ageGroup]++;
      genderWise[beneficiary.gender]++;
    }
    res.status(200).json({ ageWise, genderWise });
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const sessionEligible = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const session = await Session.findOne({ name: req.params.name });
    const attendances = await Attendance.find({ session_id: session._id });
    let metrics = {
      eligible: 0,
      attended: 0,
    };
    if (attendances.length !== 0) {
      const sampleBeneficiary = await Beneficiary.findById(
        attendances[0].beneficiary_id
      );
    }
    const community = await Community.findOne({ name: bene });

    res.status(200).json({ metrics });
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});
