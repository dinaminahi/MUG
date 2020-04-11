const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");

const categorySchema = require('./categorySchema.js');
const gameSchema = require('./gameSchema.js');
const eventSchema = require('./eventSchema.js');
const userSchema = require('./userSchema.js');
const commentSchema = require('./commentSchema.js');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// database
mongoose.connect("mongodb+srv://diana-admin:dianadiana@cluster0-v29yw.mongodb.net/MUG");

const Event = mongoose.model('Event', eventSchema);
const Game = mongoose.model('Game', gameSchema);
const User = mongoose.model('User', userSchema);
const Category = mongoose.model('Category', categorySchema);
const Comment = mongoose.model('Comment', commentSchema);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const comment = new Comment({
//    text: 'Do I need to have money with me?',
//    date: new Date().toLocaleString(),
//    userId: mongoose.Types.ObjectId("5e8e4093a918542dd08423be"),
//    eventId: mongoose.Types.ObjectId("5e8e369a05c5341fa43a8de2")
// });

// comment.save();

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

// // Get events

router.get("/events_extended/:eventId", (req, res) => {
  let eventId = req.params.eventId;
  Event.find({ _id: eventId }, (err, event) => {
    if (err) {
      sendError(err, res);
    } else {
      response.data = event;
      res.json(response);
    }
  })
});

router.get("/events_extended", (req, res) => {
  Event.aggregate([
    {
      $lookup: {
        from: "games",
        localField: "game",
        foreignField: "name",
        as: "agame"
      }
    },
    { $unwind: "$game" }
  ])
    .exec((err, events) => {
      if (err) {
        sendError(err, res);
      } else {
        response.data = events;
        res.json(response);
      }
    })
});

router.get("/events/:eventId", (req, res) => {
  let eventId = req.params.eventId;
  Event.find({ _id: eventId }, (err, event) => {
    if (err) {
      sendError(err, res);
    } else {
      response.data = event;
      res.json(response);
    }
  })
});

router.get("/events", (req, res) => {
  Event.find({}, function (err, events) {
    if (err) {
      sendError(err, res);
    } else {
      response.data = events;
      res.json(response);
    }
  })
});

router.get("/comments/:eventId", (req, res) => {
  let idOfEvent = req.params.eventId;
  Comment.aggregate([
    {
      $match: { eventId: mongoose.Types.ObjectId(idOfEvent) }
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: "$user"
    }])
    .exec((err, comments) => {
      if (err) {
        sendError(err, res);
      } else {
        response.data = comments;
        res.json(response);
      }
    })
});

router.get("/categories", (req, res) => {
  Game.aggregate([
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
    .exec((err, categories) => {
      if (err) {
        sendError(err, res);
      } else {
        response.data = categories;
        res.json(response);
      }
    })
});

router.get("/games", (req, res) => {
  Game.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "name",
        as: "categories"
      }
    },
    { $unwind: "$category" }
  ])
    .exec((err, games) => {
      if (err) {
        sendError(err, res);
      } else {
        response.data = games;
        res.json(response);
      }
    })
});

router.get("/games/:gameId", (req, res) => {
  let gameId = req.params.gameId;
  Game.find({ _id: gameId }, (err, event) => {
    if (err) {
      sendError(err, res);
    } else {
      response.data = event;
      res.json(response);
    }
  })
});

router.post("/addevent", (req, res) => {
  const event = new Event({
    eventName: req.body.eventName,
    game: req.body.game,
    description: req.body.description,
    location: {
      address: req.body.location.address,
      geo: {
        longitude: req.body.location.geo.longitude,
        latitude: req.body.location.geo.latitude
      }
    },
    dateTime: req.body.dateTime,
    duration: req.body.duration,
    players: {
      age: {
        min: req.body.players.age.min,
        max: req.body.players.age.max
      },
      count: {
        min: req.body.players.count.min,
        max: req.body.players.count.max,
        current: req.body.players.count.current
      },
      experienceNeeded: req.body.players.experience
    },
    organizer: mongoose.Types.ObjectId("5e8e4093a918542dd08423be"),
    canceled: req.body.canceled
  });

  event.save();
  console.log('api');
});

// connection(db => { 
//   db.collection("events").deleteOne({id: 10});
// })

module.exports = router;
