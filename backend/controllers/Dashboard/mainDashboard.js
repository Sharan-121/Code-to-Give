const asyncHandler = require("express-async-handler");
const Session = require("../../models/sessionModel");
const Beneficiary = require("../../models/beneficiaryModel");
const Attendance = require("../../models/attendanceModel");
const Community = require("../../models/communityModel");
const Activity = require("../../models/activityModel");

const getDashboardMetrics = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const { year, month, activity, community } = req.body;

    if (!year || !month || !activity || !community) {
      res.status(400);
      throw new Error("Invalid request");
    }
    //1. No. of sessions conducted in a particular year
    if (
      year != "None" &&
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
    };

    if(year != "None" && month === "None" && activity != "None" && community == "None"){
        const activityVal = await Activity.findOne({name : activity});
        const pipeline = [
            {
                $match: {
                    date: {
                        $gte: new Date(year, 0, 1),
                        $lt: new Date(year, 11, 31),
                    },
                    activity_id : activityVal._id
                }
            },
            {
                $group: {
                    _id: { $month: "$date" },
                    count: { $sum: 1 },
                }
            },
            {
                $sort: {
                    _id: 1,
                }
            }
        ];
        const result = await Session.aggregate(pipeline);
        res.status(200).json(result);
    }
    
    
    // else if()

  }
});

module.exports = { getDashboardMetrics };
