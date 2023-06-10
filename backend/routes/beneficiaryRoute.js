const express = require("express");
const router = express.Router();

const {
  getAvailableSessions,
  getAttendedSessions,
  updateStatus,
} = require("../controllers/beneficiaryController");
const validateToken = require("../middleware/validateTokenHandler");

router.get("/sessions/available", validateToken, getAvailableSessions);
router.get("/sessions/attended", validateToken, getAttendedSessions);
router.post("/sessions/setstatus", validateToken, updateStatus);

module.exports = router;
