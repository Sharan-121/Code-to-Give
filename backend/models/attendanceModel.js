const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    session_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    beneficiary_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beneficiary",
      required: true,
    },

    followUp_status: {
      type: Boolean,
      default: false,
    },
    feedback : {
      type: String,
      default: "No Feedback",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
