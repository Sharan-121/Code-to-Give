const asyncHandler = require("express-async-handler");
const Session = require("../../models/sessionModel");
const Beneficiary = require("../../models/beneficiaryModel");
const Attendance = require("../../models/attendanceModel");
const Community = require("../../models/communityModel");
const Activity = require("../../models/activityModel");

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
      year === "None" &&
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
      res.status(200).json(result);
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
      res.status(200).json(result);
    } else if (
      year !== "None" &&
      month === "None" &&
      activity === "None" &&
      community !== "None"
    ) {
      const monthMap = {
        "x-axis_title": `Number of Sessions conducted on ${parseInt(year)}`,
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
      };
      let result = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };
      const communityModel = await Community.findOne({ name: community });
      const sessions = await Session.find({ community_id: communityModel._id });
      for (const session of sessions) {
        if (session.date.getFullYear() === parseInt(year)) {
          result[monthMap[session.date.getMonth()]]++;
        }
      }
      res.status(200).json(result);
    } else if (
      year !== "None" &&
      month !== "None" &&
      activity === "None" &&
      community === "None"
    ) {
      let { year, month } = req.body;
      month = parseInt(month) - 1;
      year = parseInt(year);
      const sessions = await Session.find({});
      let result = {
        "x-axis_title": "Number of Beneficiaries",
        "Follow ups completed": 0,
        "Follow ups pending": 0,
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
            if (attendance.followUp === true) {
              result["Follow ups completed"]++;
            } else {
              result["Follow ups pending"]++;
            }
          }
        }
      }
      res.status(200).json(result);
    } else if (
      year !== "None" &&
      month === "None" &&
      activity === "None" &&
      community === "None"
    ) {
      let { year } = req.body;
      year = parseInt(year);
      const beneficiaries = await Beneficiary.find({});
      const monthMap = {
        "x-axis_title": `Number of Sessions conducted on ${parseInt(year)}`,
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
      };
      let result = {
        "x-axis_title": "Number of Beneficiaries Registered",
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };

      for (const beneficiary of beneficiaries) {
        if (beneficiary.createdAt.getFullYear() === year) {
          result[monthMap[beneficiary.createdAt.getMonth()]]++;
        }
      }
      res.status(200).json(result);
    }

    // else if()
  }
});

module.exports = { getDashboardMetrics };
