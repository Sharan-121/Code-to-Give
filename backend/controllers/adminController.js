const asyncHandler = require("express-async-handler");
const Activity = require("../models/activityModel");
const Community = require("../models/communityModel");
const Session = require("../models/sessionModel");
const Explore = require("../models/exploreModel");

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
      !challenges ||
      ![true, false].includes(healthcareFacilities) ||
      ![true, false].includes(educationalInstitutions)
    ) {
      res.status(400);
      throw new Error("Mandatory field(s) is/are missing");
    }

    let community = await Community.findOne({ name: name });
    if (community) {
      res.status(400);
      throw new Error("Community already exist");
    }

    let newCommunity = {
      name: name,
      location: location,
      totalPopulation: totalPopulation,
      challenges: challenges,
      healthcareFacilities: healthcareFacilities,
      educationalInstitutions: educationalInstitutions,
    };

    try {
      let apiData = await fetch(
        "http://api.positionstack.com/v1/forward?access_key=cca1336cca299e49bcf5e61ee804c38c&query=" +
          location
      );
      let jsonData = await apiData.json();
      let coordinates = [jsonData.data[0].latitude, jsonData.data[0].longitude];
      await Community.create(newCommunity);
      let explore = await Explore.findOne({
        community: name,
        location: location,
      });
      if (explore) {
        explore.isExplored = true;
        await Explore.findByIdAndUpdate(explore._id, explore, {
          new: true,
        });
      } else {
        await Explore.create({
          community: name,
          location: location,
          isExplored: true,
          coordinates: coordinates,
        });
      }
      res.status(201).json({ success: true });
    } catch {
      res.status(400);
      throw new Error("Invalid data format or location not found");
    }
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const getAllCommunities = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const communities = await Community.find();

    res.status(200).json(communities);
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
    res.status(201).json(community);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const isDateValid = (dateString, monthString, yearString) => {
  if (yearString.length != 4) {
    return false;
  }
  const month = parseInt(monthString);
  const year = parseInt(yearString);
  const date = parseInt(dateString);

  if (!(1 <= month && month <= 12)) {
    return false;
  }

  if (month === 2 && year % 4 === 0 && !(1 <= date && date <= 29)) {
    return false;
  }

  if (month === 2 && year % 4 !== 0 && !(1 <= date && date <= 28)) {
    return false;
  }

  if ([1, 3, 5, 7, 8, 10, 12].includes(month) && !(1 <= date && date <= 31)) {
    return false;
  }

  if ([4, 6, 9, 11].includes(month) && !(1 <= date && date <= 30)) {
    return false;
  }

  return true;
};

const createSession = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    const {
      name,
      activityName,
      communityName,
      date,
      location,
      age,
      gender,
      followUp,
    } = req.body;

    if (
      !name ||
      !activityName ||
      !communityName ||
      !date ||
      !location ||
      !age ||
      !gender ||
      !followUp
    ) {
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

    let sessionDate;
    let errorReason;
    try {
      const dateParts = date.split("-");
      let formattedDate = new Date();
      if (!isDateValid(dateParts[2], dateParts[1], dateParts[0])) {
        errorReason = "Invalid date";
        throw new Error("Invalid date");
      }
      formattedDate.setDate(parseInt(dateParts[2]));
      formattedDate.setMonth(parseInt(dateParts[1]) - 1);
      formattedDate.setFullYear(parseInt(dateParts[0]));
      sessionDate = formattedDate;
    } catch {
      res.status(400);
      throw new Error(
        errorReason
          ? errorReason
          : "Invalid date format! Accepted date format: yyyy-mm-dd"
      );
    }

    if (
      !gender.includes("male") &&
      !gender.includes("female") &&
      !gender.includes("other")
    ) {
      res.status(400);
      throw new Error(
        `Invalid gender format! Gender should be an non-empty array with elements as "male", "female" and/or "other"`
      );
    }

    let locParts = location.split(",");
    let coordinates = [];

    for (let loc of locParts) {
      try {
        let query = loc.trim();
        let apiData = await fetch(
          "http://api.positionstack.com/v1/forward?access_key=cca1336cca299e49bcf5e61ee804c38c&query=" +
            query
        );
        let jsonData = await apiData.json();
        coordinates = [jsonData.data[0].latitude, jsonData.data[0].longitude];
        break;
      } catch (err) {
        err = err;
      }
    }
    if (coordinates.length === 0) {
      res.status(400);
      throw new Error("Location not found");
    }

    const session = await Session.create({
      name: name,
      activity_id: activity.id,
      community_id: community.id,
      date: sessionDate,
      location: location,
      minAge: age[0],
      maxAge: age[1],
      gender: gender,
      followUp: followUp,
      coordinates: coordinates,
    });

    if (session) {
      res.status(201).json({ message: "Session created successfully" });
    } else {
      res.status(400);
      throw new Error("Invalid date format");
    }
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const getAllSessions = asyncHandler(async (req, res) => {
  if (req.user.role === "admin" || req.user.role === "staff") {
    const sessions = await Session.find();
    const result = [];

    for (const session of sessions) {
      const names = session.name.split("-");
      result.push({
        ...session._doc,
        activityName: names[0].trim(),
        communityName: names[1].trim(),
      });
    }

    res.status(200).send(result);
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

const getSessionNumber = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    let { name } = req.params;
    name = name.trim();

    if (name[name.length - 1] === "-" || !name || !name.includes("-")) {
      res.status(200).json({ sessionNumber: 1 });
      return;
    }

    const sessions = await Session.find();

    let sessionNumber = 0;

    for (const session of sessions) {
      let sessionName = session.name;
      if (sessionName.startsWith(name)) {
        let sessionParts = sessionName.split("-");
        let currentSessionNumber = parseInt(
          sessionParts[sessionParts.length - 1]
        );
        sessionNumber = Math.max(sessionNumber, currentSessionNumber + 1);
      }
    }

    res
      .status(200)
      .json({ sessionNumber: sessionNumber != 0 ? sessionNumber : 1 });
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
  getAllSessions,
  getSessionNumber,
};
