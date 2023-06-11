const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    activity_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },

    community_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    minAge: {
      type: Number,
      required: true,
    },

    maxAge: {
      type: Number,
      required: true,
    },

    gender: {
      type: Array,
      required: true,
    },

    followUp: {
      type: String,
      required: true,
    },

    coordinates: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
