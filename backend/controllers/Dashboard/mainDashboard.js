const asyncHandler = require('express-async-handler');
const Session = require('../../models/sessionModel');
const Attendance = require('../../models/attendanceModel');
const Beneficiary = require('../../models/beneficiaryModel');
const Activity = require('../../models/activityModel');
const Community = require('../../models/communityModel');


const getDashboardMetrics = asyncHandler(async (req, res) => {
  if(req.user.role === "admin"){
    const {year,activity, community, metric} = req.body;

    if(!year || !activity || !community || !metric){
      res.status(400);
      throw new Error("Please fill all the fields");
    }

    if(metric === "session"){
      if(year !== "None" && activity === "None" && community === "None"){
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
    if(year !== "None" && activity !== "None" &&community === "None"){
      const activityVal = await Activity.findOne({ name: activity });
      const pipeline = [
              {
                $match: {
                  date: {
                    $gte: new Date(year, 0, 1),
                    $lt: new Date(year, 11, 31),
                  },
                  activity_id : activityVal._id,
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
              "x-axis-title": `Number of sessions conducted in ${parseInt(year)} for ${activity}`,
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
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0],
          };
            for (const temp of result) {
              result2.data[temp._id - 1] += temp.count;
            }

            res.status(200).json(result2);
    }
    
  }
}});

module.exports = { getDashboardMetrics };
