const express = require("express");
const router = express.Router();
const { checkAdmin } = require("../controllers/adminController");
const validateToken = require("../middleware/validateTokenHandler");

router.get("/", validateToken, checkAdmin);

module.exports = router;
