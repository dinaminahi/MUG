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
  return MongoClient.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) return console.log(err);
      let db = client.db("MUG-DB");
      closure(db);
    }
  );
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

// Get events

router.get("/events_extended/:eventId", (req, res) => {
  let eventId = Number(req.params.eventId);
  connection(db => {
    db.collection("events")
      .aggregate([
        { $match: { id: eventId } },
        {
          $lookup: {
            from: "games",
            localField: "gameId",
            foreignField: "id",
            as: "game"
          }
        },
        { $unwind: "$game" }
      ])
      .next()
      .then(events => {
        response.data = events;
        res.json(response);
      })
      .catch(err => {
        sendError(err, res);
      });
  });
});

router.get("/events_extended", (req, res) => {
  connection(db => {
    db.collection("events")
      .aggregate([
        {
          $lookup: {
            from: "games",
            localField: "gameId",
            foreignField: "id",
            as: "game"
          }
        },
        { $unwind: "$game" }
      ])
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

router.get("/events/:eventId", (req, res) => {
  let eventId = Number(req.params.eventId);
  connection(db => {
    db.collection("events")
      .find({ id: eventId })
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

router.get("/categories", (req, res) => {
  connection(db => {
    db.collection("games")
      .aggregate([
        { $group: { _id: null, category: { $addToSet: "$category" } } },
        {
          $addFields: {
            category: {
              $reduce: {
                input: "$category",
                initialValue: [],
                in: { $setUnion: ["$$value", "$$this"] }
              }
            }
          }
        },
        { $project: { _id: 0, category: "$category" } }
      ])
      .next()
      .then(categories => {
        response.data = categories;
        res.json(response);
      })
      .catch(err => {
        sendError(err, res);
      });
  });
});

router.get("/games", (req, res) => {
  connection(db => {
    db.collection("games")
      .find()
      .toArray()
      .then(games => {
        response.data = games;
        res.json(response);
      })
      .catch(err => {
        sendError(err, res);
      });
  });
});

module.exports = router;
