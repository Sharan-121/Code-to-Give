const asyncHandler = require("express-async-handler");
const Community = require("../models/communityModel");

const addCommunity = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const {
      name,
      location,
      totalPopulation,
      genderRatio,
      challenges,
      healthcareFacilities,
      educationalInstitutions,
    } = req.body;

    if (
      !name ||
      !location ||
      ![true, false].includes(healthcareFacilities) ||
      ![true, false].includes(educationalInstitutions)
    ) {
      res.status(400);
      throw new Error(
        "Mandatory fields (name, location, healthcare facilities and/or educational institutions) is/are missing"
      );
    }

    let community = await Community.findOne({ name });
    if (community) {
      res.status(400);
      throw new Error("Community already exist");
    }

    let newCommunity = {
      name: name,
      location: location,
      healthcareFacilities: healthcareFacilities,
      educationalInstitutions: educationalInstitutions,
    };

    if (challenges) {
      newCommunity.challenges = challenges;
    }
    if (genderRatio) {
      newCommunity.genderRatio = genderRatio;
    }
    if (totalPopulation) {
      newCommunity.totalPopulation = totalPopulation;
    }

    try {
      await Community.create(newCommunity);
      res.status(201).json({ success: true });
    } catch {
      res.status(400);
      throw new Error("Invalid data format");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized access");
  }
});

const getAllCommunities = asyncHandler(async (req, res) => {
  if (req.user.role === "admin" || req.user.role == "staff") {
    const communities = await Community.find();
    res.status(201).json({ communities });
  } else {
    res.status(401);
    throw new Error("Unauthorized access");
  }
});

const getCommunity = asyncHandler(async (req, res) => {
  if (req.user.role === "admin" || req.user.role == "staff") {
    const { name } = req.params;
    const community = await Community.findOne({ name });
    if (!community) {
      res.status(400);
      throw new Error("Community not found");
    }
    res.status(201).json({ community });
  } else {
    res.status(401);
    throw new Error("Unauthorized access");
  }
});

module.exports = { addCommunity, getAllCommunities, getCommunity };
