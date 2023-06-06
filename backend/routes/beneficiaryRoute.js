const express = require("express");
const router = express.Router();

const { getSessions } = require("../controllers/beneficiaryController");
const validateToken = require("../middleware/validateTokenHandler");

router.get("/sessions", validateToken, getSessions);

module.exports = router;
