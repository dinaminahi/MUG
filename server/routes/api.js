const express = require("express");
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const gameSchema = {
  id: Number,
  name: String,
  category: [],
  description: String,
  playersMinAge: Number,
  playersCount: { min: Number, max: Number },
  playTimeMinutes: { min: Number, max: Number },
  instructionUrl: String,
  photoUrl: String
};

const connection = closure => {
  const uri =
    "mongodb+srv://mug-user:carrot4mug@cluster0-qmj6q.mongodb.net/test?retryWrites=true&w=majority";
  return MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err);
    let db = client.db("MUG-DB");
    closure(db);
  });
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == "object" ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

// Get users
router.get("/events", (req, res) => {
  connection(db => {
    db.collection("events")
      .find()
      .toArray()
      .then(events => {
        response.data = events;
        res.json(response);
      })
      .catch(err => {
        sendError(err, res);
      });
  });
});

module.exports = router;
