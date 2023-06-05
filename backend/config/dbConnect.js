const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Success DB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = dbConnect;
