const express = require("express");
require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 5000;

const dbConnect = require("./config/dbConnect");

app.use(express.json());
app.use("/api/v1/login", require("./routes/loginRoute"));
app.use("/api/v1/admin", require("./routes/adminRoute"));
app.use("/api/v1/staff", require("./routes/staffRoute"));
app.use(errorHandler);

const start = async () => {
  try {
    await dbConnect();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
