const asyncHandler = require("express-async-handler");
const activity = require("../models/activityModel");

const getActivities = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const allActivity = await activity.find({});
    res.status(200).json(allActivity);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const getActivityByName = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const name = req.params.name;

    const document = await activity.findOne({ name: name });

    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404);
      throw new Error("Activity not found");
    }
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const createActivity = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const { name, description, category, community, limit } = req.body;
    if (!name || !description || !category || !community || !limit) {
      res.status(400);
      throw new Error("Please fill all the fields");
    } else {
      const activityExists = await activity.findOne({
        name: name,
      });
      if (activityExists) {
        res.status(400);
        throw new Error("Activity already exists");
      }
      const newActivity = await activity.create({
        name,
        description,
        category,
        community,
        limit,
      });
      if (newActivity) {
        res.status(201).json(newActivity);
      } else {
        res.status(400);
        throw new Error("Invalid Activity data");
      }
    }
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

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
        "Mandatory field(s) (name, location, healthcare facilities and educational institutions) is/are missing"
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
  if (req.user.role === "admin") {
    const communities = await Community.find();
    res.status(201).json({ communities });
  } else {
    res.status(401);
    throw new Error("Unauthorized access");
  }
});

const getCommunity = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
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

module.exports = {
  getActivities,
  getActivityByName,
  createActivity,
  addCommunity,
  getAllCommunities,
  getCommunity,
};
