const asyncHandler = require("express-async-handler");

const Community = require("../../models/communityModel");
const Session = require("../../models/sessionModel");
const Attendance = require("../../models/attendanceModel");
const Beneficiary = require("../../models/beneficiaryModel");


const getOverallMetrics = asyncHandler(async (req, res) => {
    const communities = await Community.find({});
    const sessions = await Session.find({});
    const beneficiaries = await Beneficiary.find({});
    const attendances = await Attendance.find({});

    res.status(200).json({
        "totalCommunities" : communities.length,
        "totalSessions" : sessions.length,
        "totalBeneficiaries" : beneficiaries.length,
        "totalParticipations" : attendances.length,
    });
})

module.exports = { getOverallMetrics};

