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
    const {
      name,
      description,
      category,
      community,
      limit,
    } = req.body;
    if (
      !name ||
      !description ||
      !category ||
      !community ||
      !limit
    ) {
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

module.exports = { getActivities, getActivityByName, createActivity };
