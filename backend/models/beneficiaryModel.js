const mongoose = require("mongoose");

const beneficiarySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the beneficiary name"],
    },

    dob: {
      type: Date,
      required: [true, "Please provide the date of birth"],
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Please provide the gender of the beneficiary"],
    },

    community: {
      type: String,
      required: [true, "Please provide the community of the beneficiary"],
    },

    phoneNumber: {
      type: Number,
    },

    aadharNumber: {
      type: Number,
      unique: [true, "Aadhar number already in use"],
    },

    panNumber: {
      type: String,
      unique: [true, "PAN number already in use"],
    },

    aadharPanLink: {
      type: Boolean,
      required: [
        true,
        "Please mention whether aadhar card and PAN card are linked or not",
      ],
    },

    address: {
      type: String,
      required: [true, "Please provide the address of the beneficiary"],
    },

    familyMembersCount: {
      type: Number,
      required: [true, "Please provide the number of family members"],
    },

    employed: {
      type: Boolean,
      required: [
        true,
        "Please mention whether the beneficiary is employed or not",
      ],
    },

    annualIncome: {
      type: Number,
      required: [
        true,
        "Please provide annual income of the beneficiary's family",
      ],
    },

    bankAccount: {
      type: Boolean,
      required: [
        true,
        "Please mention whether the beneficiary has a bank account or not",
      ],
    },

    previousDoctorVisit: {
      type: Date,
    },

    medicalHistory: {
      type: String,
    },

    childStudying: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Beneficiary", beneficiarySchema);
