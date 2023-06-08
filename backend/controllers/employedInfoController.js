const asyncHandler = require("express-async-handler");
const Beneficiary = require("../models/beneficiaryModel");

const employedDistribution = asyncHandler(async (req, res) => {
  try {
    const totalEmployed = await Beneficiary.find({
      community: req.params.name,
      employed: true,
    });

    const totalUnemployed = await Beneficiary.find({
      community: req.params.name,
      employed: false,
    });

    res
      .status(200)
      .json({
        employed: totalEmployed.length,
        unemployed: totalUnemployed.length,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { employedDistribution };
