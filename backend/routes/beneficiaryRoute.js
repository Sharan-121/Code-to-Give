const express = require("express");
const router = express.Router();

const {
  getAvailableSessions,
  getAttendedSessions,
  updateStatus,
  qrAttendance,
} = require("../controllers/beneficiaryController");

const { createFeedback } = require("../controllers/feedbackController");
const {createBeneficiaryFeedback} = require("../controllers/beneficiaryController");
const validateToken = require("../middleware/validateTokenHandler");

router.get("/sessions/available", validateToken, getAvailableSessions);
router.get("/sessions/attended", validateToken, getAttendedSessions);
router.post("/sessions/setstatus", validateToken, updateStatus);
router.post("/feedback", validateToken, createFeedback);
router.post("/attendance/:name", validateToken, qrAttendance);
router.post("/feedbackBeneficiary", validateToken, createBeneficiaryFeedback);

module.exports = router;
