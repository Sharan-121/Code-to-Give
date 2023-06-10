const asyncHandler = require("express-async-handler");
const Session = require("../../models/sessionModel");
const Beneficiary = require("../../models/beneficiaryModel");
const Attendance = require("../../models/attendanceModel");
const Community = require("../../models/communityModel");
const Activity = require("../../models/activityModel");

const monthMap = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const getDashboardMetrics = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const { year, month, activity, community } = req.body;

    if (!year || year === "None") {
      res.status(400);
      throw new Error("Provide year");
    }

    if (!year || !month || !activity || !community) {
      res.status(400);
      throw new Error("Invalid request");
    }

    //1. No. of sessions conducted in a particular year
    if (
      year !== "None" &&
      month === "None" &&
      activity === "None" &&
      community === "None"
    ) {
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
        result2.data[temp._id] += temp.count;
      }
      res.status(200).json(result2);

      // year, activity
    } else if (
      year !== "None" &&
      month === "None" &&
      activity !== "None" &&
      community === "None"
    ) {
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
      let output = {
        "x-axis-title": `Number of sessions
        conducted for ${activity}`,
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

      for (const res of result) {
        output.data[res._id] += res.count;
      }
      // console.log(result);

      res.status(200).json(output);

      // year, community
    } else if (
      year !== "None" &&
      month === "None" &&
      activity === "None" &&
      community !== "None"
    ) {
      const communityModel = await Community.findOne({ name: community });
      const sessions = await Session.find({ community_id: communityModel._id });
      let result = {
        "x-axis-title": `Number of sessions conducted for ${communityModel.name}`,
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
      for (const session of sessions) {
        if (session.date.getFullYear() === parseInt(year)) {
          result.data[session.date.getMonth()]++;
        }
      }
      res.status(200).json(result);

      // year, month
    } else if (
      year !== "None" &&
      month !== "None" &&
      activity === "None" &&
      community === "None"
    ) {
      let { year, month } = req.body;
      month = monthMap[month];
      year = parseInt(year);
      const sessions = await Session.find({});
      let result = {
        "x-axis-title": "Number of Beneficiaries",
        label: ["Follow ups completed", "Follow ups pending"],
        data: [0, 0],
      };

      for (const session of sessions) {
        if (
          session.date.getFullYear() === year &&
          session.date.getMonth() === month
        ) {
          const attendances = await Attendance.find({
            session_id: session._id,
          });
          for (const attendance of attendances) {
            if (attendance.followUp_status === true) {
              result.data[0]++;
            } else {
              result.data[1]++;
            }
          }
        }
      }
      res.status(200).json(result);

      // year, month, community
    } else if (
      year !== "None" &&
      month !== "None" &&
      activity === "None" &&
      community !== "None"
    ) {
      let { year, community, month } = req.body;
      year = parseInt(year);
      month = monthMap[month];
      const beneficiaries = await Beneficiary.find({ community: community });
      let result = {
        "x-axis-title":
          "Number of Beneficiaries Registered on " + year + " - " + (month + 1),
        label: [community],
        data: [0],
      };

      for (const beneficiary of beneficiaries) {
        if (
          beneficiary.createdAt.getFullYear() === year &&
          beneficiary.createdAt.getMonth() === month
        ) {
          result.data++;
        }
      }
      res.status(200).json(result);
    }

    // else if()
  }
});

module.exports = { getDashboardMetrics };
