const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'dcronwamq',
  api_key: '597153926796645',
  api_secret: 'gAET1_v4TT3W4eNwVBGqE78_NzU'
});

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
});

const upload = multer({ storage });

const Category = require("./../models/categorySchema");
const Game = require("./../models/gameSchema");
const Event = require("./../models/eventSchema");
const User = require("./../models/userSchema");
const Comment = require("./../models/commentSchema");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileupload({
    useTempFiles: true,
  })
);

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// database
mongoose.connect(
  "mongodb+srv://diana-admin:dianadiana@cluster0-v29yw.mongodb.net/MUG"
);

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
    { $unwind: "$game" },
    {
      $lookup: {
        from: "users",
        let: { joined: "$players.joined" },
        pipeline: [
          { $match: { $expr: { $in: ["$_id", "$$joined"] } } },
          { $project: { personal: 1 } },
        ],
        as: "players.joined",
      },
    },
  ]).exec((err, events) => {
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
      $unwind: "$user",
    },
  ]).exec((err, comments) => {
    if (err) {
      sendError(err, res);
    } else {
      response.data = comments;
      res.json(response);
    }
  });
});

router.get("/categories", (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) {
      sendError(err, res);
    } else {
      response.data = categories;
      res.json(response);
    }
  });
});

router.get("/games", (req, res) => {
  Game.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "name",
        as: "categories",
      },
    },
    { $unwind: "$category" },
  ]).exec((err, games) => {
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
  Game.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(gameId) } },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "name",
        as: "categories",
      },
    },
  ]).exec((err, game) => {
    if (err) {
      sendError(err, res);
    } else {
      response.data = game;
      res.json(response);
    }
  });
});

router.get("/favourite-game-names/:userId", (req, res) => {
  let userId = req.params.userId;
  let favouriteGameNames = [];

  User.findById(userId, (err, user) => {
    if (err) {
      sendError(err, res);
    } else {
      user.games.favorited.forEach((id) => {
        Game.findById(id, (err, game) => {
          if (err) {
            sendError(err, res);
          } else {
            favouriteGames.push(game.name);
          }
        });
      });
    }
  });
  res.json(favouriteGameNames);
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
      joined: [mongoose.Types.ObjectId(req.body.organizer)],
      experienceNeeded: req.body.players.experience,
    },
    organizer: mongoose.Types.ObjectId(req.body.organizer),
    canceled: req.body.canceled,
  });

  event.save(function (err, event) {
    const eventId = event._id;
    const userId = req.body.organizer;
    User.findById(userId, function (err, user) {
      if (err) {
        sendError(err, res);
      } else {
        const events = user.events;
        events.created.push(eventId);
        User.update({ _id: userId }, { events: events }, function (err) {
          if (err) {
            sendError(err, res);
          } else {
            res.json(events.created);
          }
        });
      }
    });
  });
  console.log("Event was inserted!");
});

router.post("/addcomment", (req, res) => {
  console.log(req.body);
  if (req.body.text) {
    const comment = new Comment({
      text: req.body.text,
      date: req.body.date,
      userId: mongoose.Types.ObjectId(req.body.userId),
      eventId: mongoose.Types.ObjectId(req.body.eventId),
    });

    comment.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Comment was inserted!");
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

  // Save user's id into event's event.players.joined array and inctement event.players.count.curren
  // if toggle is 'true', otherwise do opposite
  Event.find({ _id: eventId }, (err, event) => {
    if (err) {
      sendError(err, res);
    } else {
      const eventPlayers = event[0].players || {};
      eventPlayers.joined = eventPlayers.joined || [];
      const joinedPlayersIndex = eventPlayers.joined.indexOf(userId);
      console.log(eventPlayers);
      if (toggle) {
        if (joinedPlayersIndex === -1) {
          eventPlayers.joined.push(userId);
          eventPlayers.count.current = eventPlayers.count.current + 1;
        }
      } else {
        if (joinedPlayersIndex > -1) {
          eventPlayers.joined.splice(joinedPlayersIndex, 1);
          eventPlayers.count.current = eventPlayers.count.current - 1;
        }
      }

      Event.updateOne({ _id: eventId }, { players: eventPlayers }, function (
        err
      ) {
        if (err) {
          sendError(err, res);
        }
      });
    }
  });

  // save event's id into user's  events.subscribed event
  // if toggle is 'true', otherwise do opposite
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

      User.updateOne({ _id: userId }, { events: events }, function (err) {
        if (err) {
          sendError(err, res);
        } else {
          res.json(events.subscribed);
        }
      });
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
  });
});

router.post("/edit-user/:userId", upload.single('photo'), (req, res) => {


  let userId = req.params.userId;
  let file = req.file;
  let params = {
    email: req.body.email,
    personal: {
      name: req.body.name,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      location: {
        address: req.body.address,
        geo: {
          longitude: req.body.longitude,
          latitude: req.body.latitude,
        },
      },
      dateOfBirth: req.body.dateOfBirth,
      description: req.body.description,
    },
  };

  function convertToDotNotation(obj, newObj = {}, prefix = "") {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        convertToDotNotation(obj[key], newObj, prefix + key + ".");
      } else {
        newObj[prefix + key] = obj[key];
      }
    }
    return newObj;
  }

  for (let prop in params) if (!params[prop]) delete params[prop];
  for (let prop in params.personal)
    if (!params.personal[prop]) delete params.personal[prop];
  for (let prop in params.personal.location)
    if (!params.personal.location[prop]) delete params.personal.location[prop];
  for (let prop in params.personal.location.geo)
    if (!params.personal.location.geo[prop])
      delete params.personal.location.geo[prop];

  User.update({ _id: userId }, convertToDotNotation(params), function (err) {
    if (err) {
      sendError(err, res);
    } else {
      console.log('upadeted');
    }
  });

  if (file) {
    cloudinary.uploader.upload(file.path, {
      width: 150,
      height: 150, crop: "fit"
    }, (err, result) => {
      User.update({ _id: userId }, { "personal.photoUrl": result.url }, function (err) {
        console.log('update photo')
        response.data = result;
        res.json(response);
      });
    });
  } else {
    response.data = params;
        res.json(response);
  }
});

// Event.deleteOne({eventName: 'Some game'});

module.exports = router;
