const express = require('express')
const app = express()
const path = require('path');
const mongoose = require("mongoose");
const adminRoute = require("./src/routes/admin.route")
require("dotenv").config();

app.use(express.json());
app.use("/admin", adminRoute);
app.use(express.static(path.join(__dirname, 'src')));

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
  .catch(() => {
    console.log("Connection failed!");
  });