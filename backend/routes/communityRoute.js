const express = require("express");
const router = express.Router();
const {
  addCommunity,
  getAllCommunities,
  getCommunity,
} = require("../controllers/communityController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/add", validateToken, addCommunity);
router.get("/all", validateToken, getAllCommunities);
router.get("/get/:name", validateToken, getCommunity);

module.exports = router;
