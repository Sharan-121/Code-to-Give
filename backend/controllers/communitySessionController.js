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
            }
        },
        {
            $lookup: {
                from: "communities",
                localField: "_id",
                foreignField: "_id",
                as: "community"
            }
        },
        {
            $project: {
                // community_id: '$_id',
                totalSession : '$totalSession',
                communityName: { $arrayElemAt: ["$community.name", 0]}
            }
        }
    ])
    .then((data) => {
        // communitySession = data;
        // for(let index = 0; index < data.length; index++){
        //     const community =  Community.find({_id : data[index]._id});
        //     // console.log(community);
        //     // const communityName = community.name;
        //     // console.log(communityName)
        //     // data[index].communityName = communityName;
        //     console.log(data[index]._id)    
            
        // }
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({ message: err.message });
        return;
    })



    

    
    
  


   
});

module.exports = {communitySession };
