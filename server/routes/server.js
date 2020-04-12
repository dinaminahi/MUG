const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const jwt = require("jwt-simple");

const User = require("./models/User.js");
const auth = require("./auth.js");

mongoose.Promise = Promise;

app.use(cors());
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password -__v");
    res.send(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password -__v");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

mongoose.connect(
  "mongodb+srv://mug-user:carrot4mug@cluster0-qmj6q.mongodb.net/test?retryWrites=true&w=majority",
  // {
  //   useMongoClient: true,
  // },
  (err) => {
    if (err) {
      console.log("error");
    }

    console.log("conected to mongo");
  }
);

app.use("/auth", auth.router);

app.listen(process.env.PORT || 3000);
