const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: [true, "Username already exists"],
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
  },

  role: {
    type: String,
    required: [true, "Please enter a role"],
    enum: ["admin", "staff"],
  },
});

module.exports = mongoose.model("User", userSchema);
