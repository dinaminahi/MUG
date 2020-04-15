const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");

const Category = require("./../models/categorySchema");
const Game = require("./../models/gameSchema");
const Event = require("./../models/eventSchema");
const User = require("./../models/userSchema");
const Comment = require("./../models/commentSchema");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// database
mongoose.connect(
  "mongodb+srv://diana-admin:dianadiana@cluster0-v29yw.mongodb.net/MUG"
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const comment = new Comment({
//    text: 'Do I need to have money with me?',
//    date: new Date().toLocaleString(),
//    userId: mongoose.Types.ObjectId("5e8e4093a918542dd08423be"),
//    eventId: mongoose.Types.ObjectId("5e8e369a05c5341fa43a8de2")
// });

// comment.save();

// Error handling

// const game = new Game({
//   name: 'djcndjscn',
//   category: [
//     {
//       name: 'some',
//       label: 'some',
//       iconClass: 'fas'
//     },
//     {
//       name: 'soffme',
//       label: 'some',
//       iconClass: 'fas'
//     },
//     {
//       name: 'nfff',
//       label: 'some',
//       iconClass: 'fas'
//     }
//   ],
//   description: 'ndknvdknvd',
//   playersMinAge: 2,
//   playersCount: {
//     min: 2,
//     max: 3
//   },
//   playTimeMinutes: {
//     min: 4,
//     max: 15
//   },
//   instructionUrl: 'nvkdvnd',
//   photoUrl: ['ndjvnfjvnf']
// })

// game.save();

const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == "object" ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null,
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
  });
});

router.get("/userinfo/:userId", (req, res) => {
  let userId = req.params.userId;
  User.find({ _id: userId }, (err, user) => {
    if (err) {
      sendError(err, res);
    } else {
      response.data = user;
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
        as: "agame",
      },
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
    });
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
  });
});

router.get("/events", (req, res) => {
  Event.find({}, function (err, events) {
    if (err) {
      sendError(err, res);
    } else {
      response.data = events;
      res.json(response);
    }
  });
});

router.get("/comments/:eventId", (req, res) => {
  let idOfEvent = req.params.eventId;
  Comment.aggregate([
    {
      $match: { eventId: mongoose.Types.ObjectId(idOfEvent) },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
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
    });
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
            in: { $setUnion: ["$$value", "$$this"] },
          },
        },
      },
    },
    { $project: { _id: 0, category: "$category" } },
  ]).exec((err, categories) => {
    if (err) {
      sendError(err, res);
    } else {
      response.data = categories;
      res.json(response);
    }
  });
});

router.get("/games", (req, res) => {
  Game.find({}, function (err, games) {
    if (err) {
      sendError(err, res);
    } else {
      response.data = games;
      res.json(response);
    }
  });
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
  });
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
        latitude: req.body.location.geo.latitude,
      },
    },
    dateTime: req.body.dateTime,
    duration: req.body.duration,
    players: {
      age: {
        min: req.body.players.age.min,
        max: req.body.players.age.max,
      },
      count: {
        min: req.body.players.count.min,
        max: req.body.players.count.max,
        current: req.body.players.count.current,
      },
      experienceNeeded: req.body.players.experience,
    },
    organizer: mongoose.Types.ObjectId(req.body.organizer),
    canceled: req.body.canceled
  });

  event.save();
  console.log("Event was inserted!");
});

router.post('/addcomment', (req, res) => {
  console.log(req.body);
  if (req.body.text) {
    const comment = new Comment({
      text: req.body.text,
      date: req.body.date,
      userId: mongoose.Types.ObjectId(req.body.userId),
      eventId: mongoose.Types.ObjectId(req.body.eventId)    
   });
    
   comment.save((err) => {
     if (err) {
       console.log(err);
     } else {
      console.log('Comment was inserted!');
     }
   });
  }
});

router.put("/favorite-games", (req, res) => {
  const { userId, gameId, toggle } = req.body;
  User.findById(userId, function (err, user) {
    if (err) {
      sendError(err, res);
    } else {
      const games = user.games || {};
      games.favorited = games.favorited || [];
      const index = games.favorited.indexOf(gameId);
      if (toggle) {
        if (index === -1) {
          games.favorited.push(gameId);
        }
      } else {
        if (index > -1) {
          games.favorited.splice(index, 1);
        }
      }

      User.update({ _id: userId }, { games: games }, function (err) {
        if (err) {
          sendError(err, res);
        } else {
          res.json(games.favorited);
        }
      });
    }
  });
});

router.put("/favorite-events", (req, res) => {
  const { userId, eventId, toggle } = req.body;
  User.findById(userId, function (err, user) {
    if (err) {
      sendError(err, res);
    } else {
      const events = user.events || {};
      events.interested = events.interested || [];
      const index = events.interested.indexOf(eventId);
      if (toggle) {
        if (index === -1) {
          events.interested.push(eventId);
        }
      } else {
        if (index > -1) {
          events.interested.splice(index, 1);
        }
      }

      User.update({ _id: userId }, { events: events }, function (err) {
        if (err) {
          sendError(err, res);
        } else {
          res.json(events.interested);
        }
      });
    }
  });
});

router.put("/subscribed-events", (req, res) => {
  const { userId, eventId, toggle } = req.body;
  User.findById(userId, function (err, user) {
    if (err) {
      sendError(err, res);
    } else {
      const events = user.events || {};
      events.subscribed = events.subscribed || [];
      const index = events.subscribed.indexOf(eventId);
      if (toggle) {
        if (index === -1) {
          events.subscribed.push(eventId);
        }
      } else {
        if (index > -1) {
          events.subscribed.splice(index, 1);
        }
      }

      User.update({ _id: userId }, { events: events }, function (err) {
        if (err) {
          sendError(err, res);
        } else {
          res.json(events.subscribed);
        }
      });
    }
  });
});

// connection(db => {
//   db.collection("events").deleteOne({id: 10});
// })

module.exports = router;
