const express = require("express");
const router = express.Router();
const { checkStaff } = require("../controllers/staffController");
const validateToken = require("../middleware/validateTokenHandler");

router.get("/", validateToken, checkStaff);

module.exports = router;
