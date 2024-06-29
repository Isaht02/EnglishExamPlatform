const express = require('express')
const app = express()
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.urlencoded({extended: false}))
app.use(express.json());


// Add your routes here
// app.use((req, res) => {
//   res.status(404).send("Not Found");
// });

const QuestionsRoute = require("./routes/questions.routes");

app.use("/api/questions", QuestionsRoute);

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
  .catch((e) => {
    console.log('Không thể kết nối tới db server: ' + e.message)
    console.log("Connection failed!");
  });