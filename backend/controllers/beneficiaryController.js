const asyncHandler = require("express-async-handler");
const beneficiary = require("../models/beneficiaryModel");

const getSessions = asyncHandler(async (req, res) => {
  if (req.user.role == "beneficiary") {
    
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

module.exports = { getSessions };
