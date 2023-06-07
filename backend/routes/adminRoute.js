const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");
const {
  getActivityByName,
  getActivities,
  createActivity,
  addCommunity,
  getAllCommunities,
  getCommunity,
  createSession,
  getAllSessions,
  getSessionNumber,
} = require("../controllers/adminController");

router.get("/activity", validateToken, getActivities);
router.get("/activity/:name", validateToken, getActivityByName);
router.post("/activity", validateToken, createActivity);
router.get("/community/:name", validateToken, getCommunity);
router.get("/community", validateToken, getAllCommunities);
router.post("/community", validateToken, addCommunity);
router.get("/session", validateToken, getAllSessions);
router.post("/session", validateToken, createSession);
router.get("/session/number/:name", validateToken, getSessionNumber);

module.exports = router;
