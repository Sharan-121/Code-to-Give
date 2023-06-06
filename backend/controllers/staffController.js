const asyncHandler = require("express-async-handler");
const beneficiary = require("../models/beneficiaryModel");

const createBeneficiary = asyncHandler(async (req, res) => {
  if (req.user.role == "staff") {
    const {
      name,
      dob,
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
    formattedDob.setDate(parseInt(datePartsDob[0]));
    formattedDob.setMonth(parseInt(datePartsDob[1]) - 1);
    formattedDob.setFullYear(parseInt(datePartsDob[2]));

    const datePartsDoctorVisit = previousDoctorVisit.split("-");
    let formattedDoctorVisit = new Date();
    formattedDoctorVisit.setDate(parseInt(datePartsDoctorVisit[0]));
    formattedDoctorVisit.setMonth(parseInt(datePartsDoctorVisit[1]) - 1);
    formattedDoctorVisit.setFullYear(parseInt(datePartsDoctorVisit[2]));

    const newBeneficiary = await beneficiary.create({
      name,
      dob: formattedDob,
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

module.exports = { createBeneficiary };
