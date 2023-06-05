const mongoose = require("mongoose");

const communitySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the community name"],
    unique: [true, "Community already exist"],
  },

  location: {
    type: String,
    required: [true, "Please provide the location"],
  },

  totalPopulation: {
    type: Number,
  },

  registeredPopulation: {
    type: Number,
    default: 0,
  },

  genderRatio: {
    type: String,
    default: "Unknown",
  },

  ageDistribution: {
    type: Object,
    default: {
      "0-8": 0,
      "9-16": 0,
      "17-24": 0,
      "25-40": 0,
      "40-60": 0,
      "61+": 0,
    },
  },

  challenges: {
    type: Array,
    default: [],
  },

  healthcareFacilities: {
    type: Boolean,
    required: [
      true,
      "Please mention whether healthcare facilities are available or not",
    ],
  },

  educationalInstitutions: {
    type: Boolean,
    required: [
      true,
      "Please mention whether educational institutions are available or not",
    ],
  },
});

module.exports = mongoose.model("Community", communitySchema);
