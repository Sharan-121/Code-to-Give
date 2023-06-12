const asyncHandler = require('express-async-handler');
const Beneficiary = require('../models/beneficiaryModel');
const Attendance = require('../models/attendanceModel');
const Session = require('../models/sessionModel');


const createFeedback = asyncHandler(async (req, res) => {
    const {sessionName,aadharNumber,feedback} = req.body;

    const beneficiary = await Beneficiary.findOne({ aadharNumber : aadharNumber});
    if(!beneficiary){
        res.status(400);
        throw new Error("Beneficiary not found");
    }
    const session = await Session.findOne({name:sessionName});
    if(!session){
        res.status(400);
        throw new Error("Session not found");
    }

    const result = await Attendance.findOneAndUpdate({session_id:session._id,beneficiary_id:beneficiary._id},{feedback:feedback});
    if(!result){
        res.status(400);
        throw new Error("Attendance not found");
    }
    console.log(result);
    return res.status(200).json(result);
});

module.exports = {createFeedback};