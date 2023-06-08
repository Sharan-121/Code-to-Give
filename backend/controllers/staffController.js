const asyncHandler = require("express-async-handler");
const beneficiary = require("../models/beneficiaryModel");
const attendance = require("../models/attendanceModel");
const session = require("../models/sessionModel");
const Community = require("../models/communityModel");

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

const createBeneficiary = asyncHandler(async (req, res) => {
  if (req.user.role === "admin" || req.user.role === "staff") {
    const {
      name,
      dob,
      gender,
      community,
      phoneNumber,
      aadharNumber,
      panNumber,
      aadharPanLink,
      address,
      familyMembersCount,
      employed,
      annualIncome,
      previousDoctorVisit,
      bankAccount,
      medicalHistory,
      childStudying,
    } = req.body;

    if (
      !name ||
      !dob ||
      !gender ||
      !community ||
      !aadharNumber ||
      !phoneNumber ||
      !panNumber ||
      ![true, false].includes(aadharPanLink) ||
      !address ||
      !(familyMembersCount || familyMembersCount === 0) ||
      !(annualIncome || annualIncome === 0) ||
      ![true, false].includes(employed) ||
      ![true, false].includes(bankAccount) ||
      !previousDoctorVisit ||
      ![true, false].includes(childStudying) ||
      !medicalHistory
    ) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }

    const beneficiaryExists = await beneficiary.findOne({
      name: name,
      aadharNumber: aadharNumber,
      phoneNumber: phoneNumber,
    });

    if (beneficiaryExists) {
      res.status(400);
      throw new Error("Beneficiary already exists");
    }

    const datePartsDob = dob.split("-");
    let formattedDob = new Date();
    formattedDob.setDate(parseInt(datePartsDob[2]));
    formattedDob.setMonth(parseInt(datePartsDob[1]) - 1);
    formattedDob.setFullYear(parseInt(datePartsDob[0]));

    const datePartsDoctorVisit = previousDoctorVisit.split("-");
    let formattedDoctorVisit = new Date();
    formattedDoctorVisit.setDate(parseInt(datePartsDoctorVisit[2]));
    formattedDoctorVisit.setMonth(parseInt(datePartsDoctorVisit[1]) - 1);
    formattedDoctorVisit.setFullYear(parseInt(datePartsDoctorVisit[0]));

    const newBeneficiary = await beneficiary.create({
      name,
      dob: formattedDob,
      gender,
      community,
      phoneNumber,
      aadharNumber,
      panNumber,
      aadharPanLink,
      address,
      familyMembersCount,
      annualIncome,
      employed,
      bankAccount,
      medicalHistory,
      previousDoctorVisit: formattedDoctorVisit,
      childStudying,
    });
    if (newBeneficiary) {
      res.status(201).json(newBeneficiary);
    } else {
      res.status(400);
      throw new Error("Invalid Beneficiary data");
    }
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const addAttendance = asyncHandler(async (req, res) => {
  if (req.user.role === "admin" || req.user.role === "staff") {
    const { name, aadharNumber, phoneNumber, sessionName } = req.body;
    if (!name || !aadharNumber || !phoneNumber || !sessionName) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }

    const beneficiaryData = await beneficiary.findOne({
      name: name,
      aadharNumber: aadharNumber,
      phoneNumber: phoneNumber,
    });
    const sessionData = await session.findOne({ name: sessionName });

    if (!beneficiaryData) {
      res.status(400);
      throw new Error("Beneficiary does not exist");
    }
    if (!sessionData) {
      res.status(400);
      throw new Error("Session does not exist");
    }

    const beneficiaryCommunity = beneficiaryData.community;
    const communityData = await Community.findById(sessionData.community_id);
    const communityName = communityData.name;
    if (beneficiaryCommunity !== communityName) {
      res.status(400);
      throw new Error(
        `Beneficiary is belongs to ${beneficiaryCommunity} community and the session is for ${communityName} community`
      );
    }

    const age = getAge(beneficiaryData.dob);
    if (sessionData.minAge > age || sessionData.maxAge < age) {
      res.status(400);
      throw new Error(
        `Beneficiary age is ${age} and the session is for ${sessionData.minAge} - ${sessionData.maxAge} age category`
      );
    }

    const gender = beneficiaryData.gender;
    if (!sessionData.gender.includes(gender)) {
      res.status(400);
      throw new Error(`The session is only for ${sessionData.gender} genders`);
    }

    const attendanceData = await attendance.findOne({
      session_id: sessionData._id,
      beneficiary_id: beneficiaryData._id,
    });

    if (attendanceData) {
      res.status(400);
      throw new Error("Attendance already marked");
    } else {
      const newAttendance = await attendance.create({
        session_id: sessionData._id,
        beneficiary_id: beneficiaryData._id,
      });
      if (newAttendance) {
        res.status(201).json(newAttendance);
      } else {
        res.status(400);
        throw new Error("Invalid Attendance data");
      }
    }
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

module.exports = { createBeneficiary, addAttendance };
