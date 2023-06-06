const asyncHandler = require("express-async-handler");
const Activity = require("../models/activityModel");
const Community = require("../models/communityModel");
const Session = require("../models/sessionModel");

const getActivities = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const allActivity = await Activity.find({});
    res.status(200).json(allActivity);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const getActivityByName = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const name = req.params.name;

    const document = await Activity.findOne({ name: name });

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
    const { name, description, category } = req.body;
    if (!name || !description || !category) {
      res.status(400);
      throw new Error("Please fill all the fields");
    } else {
      const activityExists = await Activity.findOne({
        name: name,
      });
      if (activityExists) {
        res.status(400);
        throw new Error("Activity already exists");
      }
      const newActivity = await Activity.create({
        name,
        description,
        category,
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
      challenges,
      healthcareFacilities,
      educationalInstitutions,
    } = req.body;

    if (
      !name ||
      !location ||
      !totalPopulation ||
      ![true, false].includes(healthcareFacilities) ||
      ![true, false].includes(educationalInstitutions)
    ) {
      res.status(400);
      throw new Error("Mandatory field(s) is/are missing");
    }

    let community = await Community.findOne({ name });
    if (community) {
      res.status(400);
      throw new Error("Community already exist");
    }

    let newCommunity = {
      name: name,
      location: location,
      totalPopulation: totalPopulation,
      healthcareFacilities: healthcareFacilities,
      educationalInstitutions: educationalInstitutions,
    };

    if (challenges) {
      newCommunity.challenges = challenges;
    }

    try {
      await Community.create(newCommunity);
      res.status(201).json({ success: true });
    } catch {
      res.status(400);
      throw new Error("Invalid data format");
    }
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const getAllCommunities = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const communities = await Community.find();
    res.status(201).json({ communities });
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
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
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const createSession = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const { name, activityName, communityName, date, location } = req.body;

    if (!name || !activityName || !communityName || !date || !location) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }
    const activity = await Activity.findOne({ name: activityName });
    const community = await Community.findOne({ name: communityName });

    if (!activity) {
      res.status(400);
      throw new Error("Activity not found");
    }

    if (!community) {
      res.status(400);
      throw new Error("Community not found");
    }

    let correctDate;
    try {
      const dateParts = date.split("-");
      let formattedDate = new Date();
      formattedDate.setDate(parseInt(dateParts[0]));
      formattedDate.setMonth(parseInt(dateParts[1]));
      formattedDate.setFullYear(parseInt(dateParts[2]));
      correctDate = formattedDate;
    } catch {
      res.status(400);
      throw new Error("Invalid date format! Accepted date format: dd-mm-yyyy");
    }

    const session = await Session.create({
      name: name,
      activity_id: activity.id,
      community_id: community.id,
      date: correctDate,
      location: location,
    });

    if (session) {
      res.status(201).json({ success: true });
    } else {
      res.status(400);
      throw new Error("Invalid date format");
    }
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

module.exports = {
  getActivities,
  getActivityByName,
  createActivity,
  addCommunity,
  getAllCommunities,
  getCommunity,
  createSession,
};
