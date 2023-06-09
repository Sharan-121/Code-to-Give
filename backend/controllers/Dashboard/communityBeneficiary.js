const asyncHandler = require("express-async-handler");
const Attendance = require("../../models/attendanceModel");
const Beneficiary = require("../../models/beneficiaryModel");

const communityBeneficiary = asyncHandler(async (req, res) => {

  Beneficiary.aggregate([
    {
      $group: {
        _id: "$community",
        communityName: { $first: "$community" },
        totalBeneficiary: { $sum: 1 },
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

module.exports = { communityBeneficiary};
