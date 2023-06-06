const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Session", sessionSchema);
