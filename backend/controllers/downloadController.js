const asyncHandler = require("express-async-handler");
const Session = require("../models/sessionModel");
const Beneficiary = require("../models/beneficiaryModel");
const Attendance = require("../models/attendanceModel");
const Community = require("../models/communityModel");
const Activity = require("../models/activityModel");
const { Readable } = require("stream");
const xlsx = require("xlsx");

const downloadFullDatabase = asyncHandler(async (req, res) => {
  if (true) {
    try {
      // Fetch data from all collections
      let session = await Session.find().lean();
      let beneficiary = await Beneficiary.find().lean();
      let attendance = await Attendance.find().lean();
      let community = await Community.find().lean();
      let activity = await Activity.find().lean();

      for (let i = 0; i < activity.length; ++i) {
        activity[i]._id = activity[i]._id.toString();
      }

      for (let i = 0; i < attendance.length; ++i) {
        attendance[i]._id = attendance[i]._id.toString();
        attendance[i].session_id = attendance[i].session_id.toString();
        attendance[i].beneficiary_id = attendance[i].beneficiary_id.toString();
      }

      for (let i = 0; i < beneficiary.length; ++i) {
        beneficiary[i]._id = beneficiary[i]._id.toString();
      }

      for (let i = 0; i < community.length; ++i) {
        community[i]._id = community[i]._id.toString();
      }

      for (let i = 0; i < session.length; ++i) {
        session[i]._id = session[i]._id.toString();
        session[i].activity_id = session[i].activity_id.toString();
        session[i].community_id = session[i].community_id.toString();
      }

      const data1 = session;
      const data2 = beneficiary;
      const data3 = attendance;
      const data4 = community;
      const data5 = activity;

      // Create a new workbook
      const workbook = xlsx.utils.book_new();

      // Convert data to worksheets
      const worksheet1 = xlsx.utils.json_to_sheet(data1);
      const worksheet2 = xlsx.utils.json_to_sheet(data2);
      const worksheet3 = xlsx.utils.json_to_sheet(data3);
      const worksheet4 = xlsx.utils.json_to_sheet(data4);
      const worksheet5 = xlsx.utils.json_to_sheet(data5);

      // Add worksheets to workbook
      xlsx.utils.book_append_sheet(workbook, worksheet1, "Session");
      xlsx.utils.book_append_sheet(workbook, worksheet2, "Beneficiary");
      xlsx.utils.book_append_sheet(workbook, worksheet3, "Attendance");
      xlsx.utils.book_append_sheet(workbook, worksheet4, "Community");
      xlsx.utils.book_append_sheet(workbook, worksheet5, "Activity");

      // Generate Excel file buffer
      const excelBuffer = xlsx.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
      });

      // Create a readable stream from the Excel buffer
      const readable = new Readable();
      readable.push(excelBuffer);
      readable.push(null);

      // Set response headers
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="DatabaseMongoDB.xlsx"'
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      // Pipe the readable stream to the response
      readable.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to export database to Excel" });
    }
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this page");
  }
});

module.exports = { downloadFullDatabase };
