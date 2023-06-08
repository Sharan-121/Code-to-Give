const asyncHandler = require("express-async-handler");
const Beneficiary = require("../models/beneficiaryModel");

const bankAccount = asyncHandler(async (req, res) => {
  try {
    const totalWithBankAccount = await Beneficiary.find({
      community: req.params.name,
      bankAccount: true,
    });

    const totalWithoutBankAccount = await Beneficiary.find({
      community: req.params.name,
      bankAccount: false,
    });

    res
      .status(200)
      .json({
        withAccount: totalWithBankAccount.length,
        withoutAccount: totalWithoutBankAccount.length,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = { bankAccount };
