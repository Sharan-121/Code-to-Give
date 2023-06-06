const asyncHandler = require("express-async-handler");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Beneficiary = require("../models/beneficiaryModel");

const validateLogin = asyncHandler(async (req, res) => {
  const { username, password, role, aadharNumber, phoneNumber } = req.body;
  if (!username || !password || !role) {
    if (!aadharNumber || !phoneNumber) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }

    const beneficiary = await Beneficiary.findOne({
      aadharNumber,
      phoneNumber,
    });

    if (!beneficiary) {
      res.status(400);
      throw new Error("Beneficiary doesn't exist");
    }

    const accessToken = jwt.sign(
      {
        user: {
          _id: beneficiary._id,
          aadharNumber: beneficiary.aadharNumber,
          phoneNumber: beneficiary.phoneNumber,
          role: "beneficiary",
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      _id: beneficiary._id,
      aadharNumber: beneficiary.aadharNumber,
      phoneNumber: beneficiary.phoneNumber,
      token: accessToken,
    });
  }

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400);
    throw new Error("Username not found");
  } else {
    if (user.password === password && user.role === role) {
      const accessToken = jwt.sign(
        {
          user: {
            _id: user._id,
            username: user.username,
            role: user.role,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      res.status(200).json({
        _id: user._id,
        username: user.username,
        token: accessToken,
      });
    } else {
      res.status(400);
      throw new Error("Invalid password or role");
    }
  }
});

module.exports = validateLogin;
