const asyncHandler = require("express-async-handler");
const Beneficiary = require("../models/beneficiaryModel");

const genderDistribution = asyncHandler(async (req, res) => {
  try {
    const totalMale = await Beneficiary.find({
      community: req.params.name,
      gender: "male",
    });
    const totalFemale = await Beneficiary.find({
      community: req.params.name,
      gender: "female",
    });

    const totalOther = await Beneficiary.find({
        community: req.params.name,
        gender : "other"
    })

    res.status(200).json({
        male : totalMale.length,
        female : totalFemale.length,
        other : totalOther.length
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { genderDistribution}
