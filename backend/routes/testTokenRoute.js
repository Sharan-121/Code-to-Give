const express = require("express");
const router = express.Router();
const testToken = require("../controllers/testTokenController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/", validateToken, testToken);

module.exports = router;
