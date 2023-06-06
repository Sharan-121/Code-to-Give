const express = require("express");
const router = express.Router();

const { createBeneficiary } = require("../controllers/staffController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/beneficiary", validateToken, createBeneficiary);

module.exports = router;
