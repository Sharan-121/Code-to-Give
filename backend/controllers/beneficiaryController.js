const asyncHandler = require("express-async-handler");
const Beneficiary = require("../models/beneficiaryModel");
const Activity = require("../models/activityModel");
const Community = require("../models/communityModel");
const Session = require("../models/sessionModel");

const getSessions = asyncHandler(async (req, res) => {
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
          name: activity.name,
          description: activity.description,
          category: activity.category,
          date: `${date}-${month}-${year}`,
          location: session.location,
        };

        console.log(displaySession);
      }
    }
    res.status(200).json({ sessions: availableSessions });
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

module.exports = { getSessions };
