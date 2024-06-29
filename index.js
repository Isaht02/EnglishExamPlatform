const express = require('express')
const app = express()
const path = require('path');
const mongoose = require("mongoose");
const adminRoute = require("./src/routes/admin.route");
const userRoute = require("./src/routes/user.route");
require("dotenv").config();

app.use(express.json());
app.use("/", adminRoute);
app.use("/", userRoute);
// app.use(express.static(path.join(__dirname, 'src')));

// Add your routes here
// app.use((req, res) => {
//   res.status(404).send("Not Found");
// });

// app.get('/', (req, res) => {
//   res.send('Hello World 2!')
// });

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