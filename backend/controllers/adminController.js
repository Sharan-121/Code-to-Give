const asyncHandler = require("express-async-handler");

const checkAdmin = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    res.status(200).json({ success: true });
  } else {
    res.status(401);
    throw new Error("Unauthorized access");
  }
});

module.exports = { checkAdmin };
