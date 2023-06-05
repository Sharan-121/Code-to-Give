const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "Health",
      "Education",
      "Social Awareness",
      "Skills Training",
      "Celebration",
    ],
    required: true,
  },
  community: { type: String, required: true },
  limit: { type: Number, required: true },
});

module.exports = mongoose.model("Activity", activitySchema);
