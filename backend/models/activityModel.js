const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter the activity name"] },

  description: {
    type: String,
    required: [true, "Please provide a description for the activity"],
  },
  
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
});

module.exports = mongoose.model("Activity", activitySchema);
