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
    required: [true, "Please provide total population"],
  },

  challenges: {
    type: String,
    required: [true, "Please mention the challenges faced by the community"],
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
