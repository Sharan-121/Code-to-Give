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
      !aadharPanLink ||
      !address ||
      !familyMembersCount ||
      !annualIncome ||
      !employed ||
      !bankAccount ||
      !previousDoctorVisit ||
      !childStudying ||
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

    const newBeneficiary = await beneficiary.create({
      name,
      dob,
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
      previousDoctorVisit,
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
