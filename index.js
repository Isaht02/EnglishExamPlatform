const express = require('express')
const app = express()
const path = require('path');
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoute = require("./src/routes/admin.route");
const userRoute = require("./src/routes/user.route");
const questionRoute = require("./src/routes/questions.route");
const examRoute = require("./src/routes/exam.route");
const docRoute = require("./src/routes/document.route");

require("dotenv").config();

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use("/", adminRoute);
app.use("/", userRoute);
app.use("/api/questions", questionRoute);
app.use("/api/exam", examRoute);
app.use("/api/doc", docRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to database!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });