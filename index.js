require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const foodRouter = require("./routes/foodRoutes.js");
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB', error));

app.get('/',(req,res)=>{
  res.send("default static page")
})

app.use(foodRouter);

app.listen(5000, () => {
  console.log("Server is running...");
});