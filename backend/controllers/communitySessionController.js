const asyncHandler = require("express-async-handler");
const Session = require("../models/sessionModel");
const Community = require("../models/communityModel");
const Beneficiary = require("../models/beneficiaryModel");
const Attendance = require("../models/attendanceModel");

const communitySession = asyncHandler(async (req, res) => {
  Session.aggregate([
    {
      $group: {
        _id: "$community_id",
        totalSession: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "communities",
        localField: "_id",
        foreignField: "_id",
        as: "community",
      },
    },
    {
      $project: {
        totalSession: "$totalSession",
        communityName: { $arrayElemAt: ["$community.name", 0] },
      },
    },
  ])
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      return;
    });
});

module.exports = { communitySession };
