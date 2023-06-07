const express = require("express");
const router = express.Router();

const {
  createBeneficiary,
  addAttendance,
} = require("../controllers/staffController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/beneficiary", validateToken, createBeneficiary);
router.post("/attendance/", validateToken, addAttendance);

module.exports = router;
