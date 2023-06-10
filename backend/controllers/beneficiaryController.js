const asyncHandler = require("express-async-handler");
const Beneficiary = require("../models/beneficiaryModel");
const Activity = require("../models/activityModel");
const Community = require("../models/communityModel");
const Session = require("../models/sessionModel");
const Attendance = require("../models/attendanceModel");

const getAllBeneficiaries = asyncHandler(async (req, res) => {
  if (req.user.role == "admin") {
    const beneficiaries = await Beneficiary.find({});
    res.status(200).send(beneficiaries);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const getAvailableSessions = asyncHandler(async (req, res) => {
  if (req.user.role == "beneficiary") {
    const beneficiary = await Beneficiary.findById(req.user._id);
    const community = await Community.findOne({ name: beneficiary.community });
    const sessions = await Session.find({ community_id: community.id });
    let availableSessions = [];
    for (const session of sessions) {
      if (
        session.date >=
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          0,
          0,
          0
        )
      ) {
        let activity = await Activity.findById(session.activity_id);

        const date =
          session.date.getDate() > 9
            ? session.date.getDate()
            : "0" + session.date.getDate();
        const month =
          session.date.getMonth() + 1 > 9
            ? session.date.getMonth() + 1
            : "0" + (session.date.getMonth() + 1);
        const year = session.date.getFullYear();

        let displaySession = {
          name: activity.name + " - " + parseInt(session.name.split("-").pop()),
          description: activity.description,
          category: activity.category,
          date: `${date}-${month}-${year}`,
          location: session.location,
        };

        availableSessions.push(displaySession);
      }
    }
    res.status(200).json({ sessions: availableSessions });
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const getAttendedSessions = asyncHandler(async (req, res) => {
  if (req.user.role == "beneficiary") {
    const attendances = await Attendance.find({ beneficiary_id: req.user._id });
    let sessions = [];
    let attendedSessions = [];
    let statuses = [];

    for (const attendance of attendances) {
      let session = await Session.findById(attendance.session_id);
      sessions.push(session);
      statuses.push(attendance.followUp_status);
    }
    let i = 0;
    for (const session of sessions) {
      let activity = await Activity.findById(session.activity_id);

      const date =
        session.date.getDate() > 9
          ? session.date.getDate()
          : "0" + session.date.getDate();
      const month =
        session.date.getMonth() + 1 > 9
          ? session.date.getMonth() + 1
          : "0" + (session.date.getMonth() + 1);
      const year = session.date.getFullYear();

      let displaySession = {
        sessionId: session._id.toString(),
        name: activity.name + " - " + parseInt(session.name.split("-").pop()),
        description: activity.description,
        category: activity.category,
        date: `${date}-${month}-${year}`,
        location: session.location,
        followUp: session.followUp,
        status: statuses[i],
      };

      attendedSessions.push(displaySession);
      i++;
    }
    res.status(200).json({ sessions: attendedSessions });
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const updateStatus = asyncHandler(async (req, res) => {
  if (req.user.role == "beneficiary") {
    const beneficiary = await Beneficiary.findOne({
      aadharNumber: req.user.aadharNumber,
    });
    const { status, sessionId } = req.body;
    let attendance = await Attendance.findOne({
      session_id: sessionId,
      beneficiary_id: beneficiary._id,
    });
    attendance.followUp_status = status;

    await Attendance.findByIdAndUpdate(attendance._id, attendance, {
      new: true,
    });

    res.status(200).json({ success: true });
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

module.exports = {
  getAvailableSessions,
  getAttendedSessions,
  getAllBeneficiaries,
  updateStatus,
};
