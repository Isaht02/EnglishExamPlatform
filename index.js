const express = require('express')
const app = express()
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());

// Add your routes here
// app.use((req, res) => {
//   res.status(404).send("Not Found");
// });

app.get('/', (req, res) => {
  res.send('Hello World 2!')
})

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