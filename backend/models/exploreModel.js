const mongoose = require("mongoose");

const exploreSchema = new mongoose.Schema(
  {
    community: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    isExplored: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Explore", exploreSchema);
