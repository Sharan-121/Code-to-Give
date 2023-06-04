const asyncHandler = require("express-async-handler");

const testToken = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = testToken;
