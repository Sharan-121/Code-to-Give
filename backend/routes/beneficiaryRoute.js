const express = require("express");
const router = express.Router();

const {
  getAvailableSessions,
  getAttendedSessions,
} = require("../controllers/beneficiaryController");
const validateToken = require("../middleware/validateTokenHandler");

router.get("/sessions/available", validateToken, getAvailableSessions);
router.get("/sessions/attended", validateToken, getAttendedSessions);

module.exports = router;
