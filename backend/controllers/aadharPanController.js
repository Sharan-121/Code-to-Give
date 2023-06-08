const asyncHandler = require("express-async-handler");
const Beneficiary = require("../models/beneficiaryModel");


const aadharPanLink = asyncHandler(async (req, res) => {
    try{
        const totalLinked = await Beneficiary.find({'community' : req.params.name, 'aadharPanLink' : true});

        const totalUnlinked = await Beneficiary.find({'community' : req.params.name, 'aadharPanLink' : false});

        res.status(200).json({totalLinked : totalLinked.length, totalUnlinked : totalUnlinked.length});

    }catch(error){
        res.status(500).json({message : error.message})
    }
});

module.exports = {aadharPanLink};