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
const {ageAndCommunityWiseEngagement} = require("../controllers/ageEngagementController")

const {communityWiseBeneficiary} = require("../controllers/communityBeneficiaryController");
const {communityWiseAttendance} = require("../controllers/communityAttendanceController");

router.get("/activity", validateToken, getActivities);
router.get("/activity/:name", validateToken, getActivityByName);
router.get("/activity/metrics/cwa/:name",validateToken, communityWiseAttendance);
router.get("/activity/metrics/cwb/:name",validateToken, communityWiseBeneficiary);
router.post("/activity", validateToken, createActivity);
router.get("/community/:name", validateToken, getCommunity);
router.get("/community", validateToken, getAllCommunities);
router.post("/community", validateToken, addCommunity);
router.get("/session", validateToken, getAllSessions);
router.post("/session", validateToken, createSession);
router.get("/session/number/:name", validateToken, getSessionNumber);
router.get("/metrics/agecommunity/:activityName", validateToken, ageAndCommunityWiseEngagement);

module.exports = router;
