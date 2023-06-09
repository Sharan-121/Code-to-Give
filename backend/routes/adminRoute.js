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

const { getAllBeneficiaries } = require("../controllers/beneficiaryController");

const {
  getActivityMetrics,
} = require("../controllers/activityMetricsController");
const {
  getCommunityMetrics,
} = require("../controllers/communityMetricsController");
const {
  genderAndCommunityWiseEngagement,
  genderAndSessionWiseCount,
} = require("../controllers/genderEngagementController");
const {
  ageAndCommunityWiseEngagement,
} = require("../controllers/ageEngagementController");
const {
  communityWiseBeneficiary,
} = require("../controllers/communityBeneficiaryController");
const {
  communityWiseAttendance,
} = require("../controllers/communityAttendanceController");
const { genderDistribution } = require("../controllers/genderInfoController");
const {
  employedDistribution,
} = require("../controllers/employedInfoController");
const { aadharPanLink } = require("../controllers/aadharPanController");
const { bankAccount } = require("../controllers/bankAccountController");
const {
  genderDistributionCommunity,
  activeBeneficiariesCommunity,
  activityAttendanceCountCommunity,
} = require("../controllers/communityMetrics");
const {
  communitySession,
} = require("../controllers/communitySessionController");
const {
  sessionCountCommunityWiseTimePeriod,
  beneficiaryCountActivityWise,
} = require("../controllers/mainDashboardMetrics");
const {
  communityBeneficiary,
} = require("../controllers/Dashboard/communityBeneficiary");
const {
  activityCountForCommunity,
} = require("../controllers/activityCountCommunityWise");
const {
  getDashboardMetrics,
} = require("../controllers/Dashboard/mainDashboard");

router.get("/activity", validateToken, getActivities);
router.get("/activity/:name", validateToken, getActivityByName);
router.get("/activity/metrics/:name", validateToken, getActivityMetrics);
router.get(
  "/activity/metrics/cwa/:name",
  validateToken,
  communityWiseAttendance
);
router.get(
  "/activity/metrics/cwb/:name",
  validateToken,
  communityWiseBeneficiary
);
router.get(
  "/activity/metrics/acwe/:activityName",
  validateToken,
  ageAndCommunityWiseEngagement
);
router.get(
  "/activity/metrics/gcwe/:activityName",
  validateToken,
  genderAndCommunityWiseEngagement
);
router.get(
  "/activity/metrics/gaswc/:activityName",
  validateToken,
  genderAndSessionWiseCount
);
router.post("/activity", validateToken, createActivity);
router.get("/community/metrics/:name", validateToken, getCommunityMetrics);
router.get(
  "/community/metrics/getGender/:name",
  validateToken,
  genderDistribution
);
router.get(
  "/community/metrics/getEmployed/:name",
  validateToken,
  employedDistribution
);
router.get(
  "/community/metrics/getAadharPan/:name",
  validateToken,
  aadharPanLink
);
router.get(
  "/community/metrics/getBankAccount/:name",
  validateToken,
  bankAccount
);
router.get("/community/:name", validateToken, getCommunity);
router.get("/community", validateToken, getAllCommunities);
router.post("/community", validateToken, addCommunity);
router.get("/session", validateToken, getAllSessions);
router.post("/session", validateToken, createSession);
router.get("/session/number/:name", validateToken, getSessionNumber);
router.get(
  "/community/metrics/gender/:name",
  validateToken,
  genderDistributionCommunity
);
router.get(
  "/community/metrics/participation/:name",
  validateToken,
  activeBeneficiariesCommunity
);
router.get(
  "/community/metrics/aac/:name",
  validateToken,
  activityAttendanceCountCommunity
);

router.get("/dashboard/metrics/cs/", validateToken, communitySession);
router.get("/dashboard/metrics/cb/", validateToken, communityBeneficiary);
router.get(
  "/dashboard/metrics/tpsc/:timePeriod",
  validateToken,
  sessionCountCommunityWiseTimePeriod
);
router.get(
  "/dashboard/metrics/bcaw",
  validateToken,
  beneficiaryCountActivityWise
);
router.get("/dashboard/metrics/acfc", validateToken, activityCountForCommunity);

router.get("/beneficiary", validateToken, getAllBeneficiaries);

router.post("/dashboard/metrics", validateToken, getDashboardMetrics);

module.exports = router;
