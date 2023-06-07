const asyncHandler = require("express-async-handler");
const Activity = require("../models/activityModel");
const Community = require("../models/communityModel");
const Session = require("../models/sessionModel");
const Attendance = require("../models/attendanceModel");
const Beneficiary = require("../models/beneficiaryModel");

const getAge = (birthDate) => {
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const getActivityMetrics = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.findOne({ name: req.params.name });
    const activityId = activity._id;

    // 1. top end cumulative metrics
    const totalCommunities = await Session.distinct("community_id", {
      activity_id: activityId,
    });

    const totalSessions = await Session.find({
      activity_id: activityId,
    });
    const sessionIds = await Session.find({ activity_id: activityId }, "_id");
    const sessionIdArray = sessionIds.map((session) => session._id);

    const totalBeneficiaries = await Attendance.distinct("beneficiary_id", {
      session_id: { $in: sessionIdArray },
    });

    //2. additional attendance based metrics

    //2.1 Community wise attendance for the activity across multiple sessions

    const communitySession = {};

    for (const session of totalSessions) {
      const sessionId = session._id;
      const attendanceRecords = await Attendance.find({
        session_id: sessionId,
      });

      const sessionParts = session.name.split("-");
      const sessionNumber = parseInt(sessionParts[sessionParts.length - 1]);

      const communityName = await Community.findOne(
        { _id: session.community_id },
        "name"
      );

      if (communitySession[communityName.name] === undefined) {
        communitySession[communityName.name] = [];
        communitySession[communityName.name][sessionNumber] =
          attendanceRecords.length;
      } else {
        communitySession[communityName.name][sessionNumber] =
          attendanceRecords.length;
      }
    }

    //2.2 Community wise attendance for age group
    //2.3 Community wise attendance for gender

    let ageGroupAttendance = {
      "0-8": [0, 0],
      "9-16": [0, 0],
      "17-27": [0, 0],
      "28-40": [0, 0],
      "41-60": [0, 0],
      "61+": [0, 0],
    };

    let communityWiseAgeGroup = {};
    let communityWiseGender = {};

    for (const session of totalSessions) {
      const currentCommunity = await Community.findById(session.community_id);
      const communityName = currentCommunity.name;
      const allBeneficiariesOfCommunity = await Beneficiary.find({
        community: communityName,
      });
      for (const beneficiary of allBeneficiariesOfCommunity) {
        const age = getAge(beneficiary.dob);
        if (session.minAge <= age && age <= session.maxAge) {
          let ageGroup = "";
          if (age <= 8) {
            ageGroup = "0-8";
          } else if (9 <= age && age <= 16) {
            ageGroup = "9-16";
          } else if (17 <= age && age <= 27) {
            ageGroup = "17-27";
          } else if (28 <= age && age <= 40) {
            ageGroup = "28-40";
          } else if (41 <= age && age <= 60) {
            ageGroup = "41-60";
          } else {
            ageGroup = "61+";
          }

          if (communityWiseAgeGroup[communityName] === undefined) {
            communityWiseAgeGroup[communityName] = ageGroupAttendance;
            communityWiseAgeGroup[communityName][ageGroup][1]++;
          } else {
            communityWiseAgeGroup[communityName][ageGroup][1]++;
          }

          if (communityWiseGender[communityName] === undefined) {
            communityWiseGender[communityName] = {};
            communityWiseGender[communityName].male = [0, 0];
            communityWiseGender[communityName].female = [0, 0];
          }

          if (beneficiary.gender === "male") {
            communityWiseGender[communityName].male[1]++;
          } else {
            communityWiseGender[communityName].female[1]++;
          }
        }
      }
      const attendances = await Attendance.find({ session_id: session._id });

      for (const attendance of attendances) {
        const beneficiary = await Beneficiary.findById(
          attendance.beneficiary_id
        );

        if (communityWiseGender[beneficiary.community] === undefined) {
          communityWiseGender[beneficiary.community] = {};
          communityWiseGender[beneficiary.community].male = [0, 0];
          communityWiseGender[beneficiary.community].female = [0, 0];
        }

        if (beneficiary.gender === "male") {
          communityWiseGender[beneficiary.community].male[0]++;
        } else {
          communityWiseGender[beneficiary.community].female[0]++;
        }

        const age = getAge(beneficiary.dob);

        let ageGroup = "";
        if (age <= 8) {
          ageGroup = "0-8";
        } else if (9 <= age && age <= 16) {
          ageGroup = "9-16";
        } else if (17 <= age && age <= 27) {
          ageGroup = "17-27";
        } else if (28 <= age && age <= 40) {
          ageGroup = "28-40";
        } else if (41 <= age && age <= 60) {
          ageGroup = "41-60";
        } else {
          ageGroup = "61+";
        }

        if (communityWiseAgeGroup[beneficiary.community] === undefined) {
          communityWiseAgeGroup[beneficiary.community] = ageGroupAttendance;
          communityWiseAgeGroup[beneficiary.community][ageGroup][0]++;
        } else {
          communityWiseAgeGroup[beneficiary.community][ageGroup][0]++;
        }
      }
    }

    // response

    res.status(200).json({
      totalCommunities: totalCommunities.length,
      totalSessions: totalSessions.length,
      totalBeneficiaries: totalBeneficiaries.length,
      communitySession: communitySession,
      communityWiseAgeGroup: communityWiseAgeGroup,
      communityWiseGender: communityWiseGender,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Server Error");
  }
});

module.exports = { getActivityMetrics };
