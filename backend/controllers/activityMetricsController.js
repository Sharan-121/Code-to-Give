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

    // //2. additional attendance based metrics

    // //2.1 Community wise attendance for the activity across multiple sessions

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

    // 2.2 Community wise attendance for age group
    // 2.3 Community wise attendance for gender
    // 2.4(impact) total no. of beneficiaries attended the activity
    // 2.5 no. of attended vs no. of eligible community wise

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
    let attendedBeneficiaries = 0;
    let numberOfAttendedVsEligibleCommunityWise = {};

    for (const session of totalSessions) {
      const currentCommunity = await Community.findById(session.community_id);
      const communityName = currentCommunity.name;
      const allBeneficiariesOfCommunity = await Beneficiary.find({
        community: communityName,
      });
      for (const beneficiary of allBeneficiariesOfCommunity) {
        const age = getAge(beneficiary.dob);
        if (
          session.minAge <= age &&
          age <= session.maxAge &&
          session.gender.includes(beneficiary.gender)
        ) {
          if (
            numberOfAttendedVsEligibleCommunityWise.communityName === undefined
          ) {
            numberOfAttendedVsEligibleCommunityWise.communityName = [0, 1];
          } else {
            numberOfAttendedVsEligibleCommunityWise.communityName[1]++;
          }

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
        attendedBeneficiaries++;
        const beneficiary = await Beneficiary.findById(
          attendance.beneficiary_id
        );

        if (
          numberOfAttendedVsEligibleCommunityWise[beneficiary.community] ===
          undefined
        ) {
          numberOfAttendedVsEligibleCommunityWise[beneficiary.community] = [
            1, 0,
          ];
        } else {
          numberOfAttendedVsEligibleCommunityWise[beneficiary.community][0]++;
        }

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

    // //2.4 Total Number of beneficiaries across all communities for this activity

    // communityWiseBeneficiaries = {};
    // for (const session of totalSessions) {
    //   const attendances = await Attendance.find({ session_id: session._id });
    //   const community = await Community.findById(session.community_id);
    //   const communityName = community.name;
    //   if (communityWiseBeneficiaries[communityName] === undefined) {
    //     communityWiseBeneficiaries[communityName] = attendances.length;
    //   } else {
    //     communityWiseBeneficiaries[communityName] += attendances.length;
    //   }
    // }

    // // 2.5 Number of eligible vs Number of people attended atleast one session.
    // numberOfEligible = {};
    // numberOfAttended = {};
    // for (const session of totalSessions) {
    //   const community = await Community.findById(session.community_id);
    //   const communityName = community.name;
    //   const attendances = await Attendance.find({ session_id: session._id });
    //   const beneficiaries = await Beneficiary.find({
    //     community: communityName,
    //   });
    //   if (numberOfEligible[communityName] === undefined) {
    //     numberOfEligible[communityName] = beneficiaries.length;
    //   }
    //   if (numberOfAttended[communityName] === undefined) {
    //     numberOfAttended[communityName] = attendances.length;
    //   } else {
    //     numberOfAttended[communityName] = Math.max(
    //       numberOfAttended[communityName],
    //       attendances.length
    //     );
    //   }
    // }

    // response

    res.status(200).json({
      totalCommunities: totalCommunities.length,
      totalSessions: totalSessions.length,
      totalBeneficiaries: totalBeneficiaries.length,
      communitySession: communitySession,
      communityWiseAgeGroup: communityWiseAgeGroup,
      communityWiseGender: communityWiseGender,
      // communityWiseBeneficiaries: communityWiseBeneficiaries,
      attendedBeneficiaries: attendedBeneficiaries,
      // numberOfEligible: numberOfEligible,
      // numberOfAttended: numberOfAttended,
      attendedVsEligible: numberOfAttendedVsEligibleCommunityWise,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { getActivityMetrics };
