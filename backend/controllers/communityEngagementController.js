const asyncHandler = require("express-async-handler");
const Community = require("../models/communityModel");
const Session = require("../models/sessionModel");
const Attendance = require("../models/attendanceModel");
const Activity = require("../models/activityModel");
const Beneficiary = require("../models/beneficiaryModel");


const communityWiseBeneficiaries = asyncHandler(async (req, res) => {
    try{
        const activity = await Activity.findOne({ name: req.params.name });
        const activityId = activity._id;
        const totalSessions = await Session.find({
            activity_id: activityId,
        });

        const communityWiseBeneficiaries = {};

        for(const session of totalSessions){
            const attendances = await Attendance.find({ session_id: session._id });
            const community = await Community.findById(session.community_id);
            const communityName = community.name;
            if (communityWiseBeneficiaries[communityName] === undefined) {
                communityWiseBeneficiaries[communityName] = attendances.length;
            } else {
                communityWiseBeneficiaries[communityName] = Math.max(attendances.length, communityWiseBeneficiaries[communityName]);
              }
        }

        res.status(200).json(communityWiseBeneficiaries);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = { communityWiseBeneficiaries };