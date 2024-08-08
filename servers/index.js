const express = require('express')
const app = express()
const path = require('path');
const mongoose = require("mongoose");
const cors = require("cors");

const { createServer } = require("http");
const { Server } = require("socket.io");
const adminRoute = require("./src/routes/admin.route");
const userRoute = require("./src/routes/user.route");
const questionRoute = require("./src/routes/questions.route");
const examRoute = require("./src/routes/exam.route");
const searchRoute = require("./src/routes/search.route");
const reviewExamRoute = require("./src/routes/reviewExam.route");
const conversationRoute = require("./src/routes/conversations.route");
const initSocket = require("./src/utils/socket");
require("dotenv").config();

const httpServer = createServer(app);

initSocket(httpServer);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())
app.use("/", adminRoute);
app.use("/api/", userRoute);
app.use("/api/questions", questionRoute);
app.use("/api/exam", examRoute);
app.use("/api/search", searchRoute);
app.use("/api/reviewexams", reviewExamRoute);
app.use("/api/conversations", conversationRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to database!");
    httpServer.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });


