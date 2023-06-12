const asyncHandler = require("express-async-handler");
const Session = require("../../models/sessionModel");
const Attendance = require("../../models/attendanceModel");
const Beneficiary = require("../../models/beneficiaryModel");
const Activity = require("../../models/activityModel");
const Community = require("../../models/communityModel");

const getDashboardMetrics = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const { year, activity, community, metric, compareTo } = req.body;

    if (!year || !activity || !community || !metric || !compareTo) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }

    if (metric === "session") {
      if (year !== "None" && activity === "None" && community === "None") {
        const pipeline = [
          {
            $match: {
              date: {
                $gte: new Date(year, 0, 1),
                $lt: new Date(year, 11, 31),
              },
            },
          },
          {
            $group: {
              _id: { $month: "$date" },
              count: { $sum: 1 },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ];

        const result = await Session.aggregate(pipeline);

        let result2 = {
          "x-axis-title": `Number of sessions conducted in ${parseInt(year)}`,
          label: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };
        for (const temp of result) {
          result2.data[temp._id - 1] += temp.count;
        }

        res.status(200).json(result2);
      }

      if (year !== "None" && activity !== "None" && community === "None") {
        const activityVal = await Activity.findOne({ name: activity });
        const pipeline = [
          {
            $match: {
              date: {
                $gte: new Date(year, 0, 1),
                $lt: new Date(year, 11, 31),
              },
              activity_id: activityVal._id,
            },
          },
          {
            $group: {
              _id: { $month: "$date" },
              count: { $sum: 1 },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ];
        const result = await Session.aggregate(pipeline);
        let result2 = {
          "x-axis-title": `Number of sessions conducted in ${parseInt(
            year
          )} for ${activity}`,
          label: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };
        for (const temp of result) {
          result2.data[temp._id - 1] += temp.count;
        }

        res.status(200).json(result2);
      }
      if (year !== "None" && activity === "None" && community !== "None") {
        const communityVal = await Community.findOne({ name: community });
        const pipeline = [
          {
            $match: {
              date: {
                $gte: new Date(year, 0, 1),
                $lt: new Date(year, 11, 31),
              },
              community_id: communityVal._id,
            },
          },
          {
            $group: {
              _id: { $month: "$date" },
              count: { $sum: 1 },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ];
        const result = await Session.aggregate(pipeline);
        let result2 = {
          "x-axis-title": `Number of sessions conducted in ${parseInt(
            year
          )} for ${community}`,
          label: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };
        for (const temp of result) {
          result2.data[temp._id - 1] += temp.count;
        }

        res.status(200).json(result2);
      }

      if (year !== "None" && activity !== "None" && community !== "None") {
        const activityVal = await Activity.findOne({ name: activity });
        const communityVal = await Community.findOne({ name: community });

        const pipeline = [
          {
            $match: {
              date: {
                $gte: new Date(year, 0, 1),
                $lt: new Date(year, 11, 31),
              },
              community_id: communityVal._id,
              activity_id: activityVal._id,
            },
          },
          {
            $group: {
              _id: { $month: "$date" },
              count: { $sum: 1 },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ];
        const result = await Session.aggregate(pipeline);
        let result2 = {
          "x-axis-title": `Number of sessions conducted in ${parseInt(
            year
          )} for ${community} and ${activity}`,
          label: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };
        for (const temp of result) {
          result2.data[temp._id - 1] += temp.count;
        }

        res.status(200).json(result2);
      }
    }
     else if (metric === "attendance") {
      if (year !== "None" && activity === "None" && community === "None") {
        const pipleline = [
          {
            $lookup: {
              from: "sessions",
              localField: "session_id",
              foreignField: "_id",
              as: "session",
            },
          },
          {
            $unwind: "$session",
          },
          {
            $project: {
              year: { $year: "$session.date" },
              month: { $month: "$session.date" },
            },
          },
          {
            $match: {
              year: year,
            },
          },
          {
            $group: {
              _id: "$month",
              count: { $sum: 1 },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ];

        const result = await Attendance.aggregate(pipleline);

        let result2 = {
          "x-axis-title": `Total Number of Attendees in ${parseInt(year)}`,
          label: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };
        for (const temp of result) {
          result2.data[temp._id - 1] += temp.count;
        }

        res.status(200).json(result2);
      }
      if (year !== "None" && activity !== "None" && community === "None") {
        let result2 = {
          "x-axis-title": `Total Number of Attendees in ${parseInt(
            year
          )} for ${activity}`,
          label: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };
        const activityVal = await Activity.findOne({ name: activity });

        const activitySessions = await Session.find({
          activity_id: activityVal._id,
        });

        const sessionIds = activitySessions.map((session) => session._id);

        const attendances = await Attendance.find({
          session_id: { $in: sessionIds },
        });

        for (const attendance of attendances) {
          const sessionId = attendance.session_id;
          const session = await Session.findOne({ _id: sessionId });
          const yearOfSession = session.date.getFullYear();
          const monthOfSession = session.date.getMonth();
          if (yearOfSession === parseInt(year)) {
            result2.data[monthOfSession] += 1;
          }
        }

        res.status(200).json(result2);
      }
    }
    if (year !== "None" && activity === "None" && community !== "None") {
      let result2 = {
        "x-axis-title": `Total Number of Attendees in ${parseInt(
          year
        )} for ${community}`,
        label: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      };

      const communityVal = await Community.findOne({ name: community });

      const communitySessions = await Session.find({
        community_id: communityVal._id,
      });

      const sessionIds = communitySessions.map((session) => session._id);

      const attendances = await Attendance.find({
        session_id: { $in: sessionIds },
      });

      for (const attendance of attendances) {
        const sessionId = attendance.session_id;
        const session = await Session.findOne({ _id: sessionId });
        const yearOfSession = session.date.getFullYear();
        const monthOfSession = session.date.getMonth();
        if (yearOfSession === parseInt(year)) {
          result2.data[monthOfSession] += 1;
        }
      }

      res.status(200).json(result2);
    }

    if (year !== "None" && activity !== "None" && community !== "None") {
      let result2 = {
        "x-axis-title": `Total Number of Attendees in ${parseInt(
          year
        )} for ${community} and ${activity}`,
        label: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      };
      const activityVal = await Activity.findOne({ name: activity });
      const communityVal = await Community.findOne({ name: community });

      const sessions = await Session.find({
        activity_id: activityVal._id,
        community_id: communityVal._id,
      });

      const sessionIds = sessions.map((session) => session._id);

      const attendances = await Attendance.find({
        session_id: { $in: sessionIds },
      });

      for (const attendance of attendances) {
        const sessionId = attendance.session_id;
        const session = await Session.findOne({ _id: sessionId });
        const yearOfSession = session.date.getFullYear();
        const monthOfSession = session.date.getMonth();
        if (yearOfSession === parseInt(year)) {
          result2.data[monthOfSession] += 1;
        }
      }

      res.status(200).json(result2);
    }
  }
});

module.exports = { getDashboardMetrics };
