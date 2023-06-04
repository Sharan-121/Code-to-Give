const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const validateLogin = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400);
    throw new Error("Username not found");
  } else {
    if (user.password === password && user.role === role) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        token: null,
      });
    } else {
      res.status(400);
      throw new Error("Invalid password or role");
    }
  }
});

module.exports = validateLogin;
