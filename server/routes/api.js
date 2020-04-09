const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const auth = require('./auth.js')
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// new for user creation
app.use(cors());
app.use(bodyParser.json());


// using express


//--- data - for future coreections-------????????

const Game = require('./models/Game.js')
const Category = require('./models/Category.js')
const Event = require('./models/Event.js')

//------

const User = require("./models/User.js");
// for mongoose
mongoose.Promise = Promise;

//

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const connection = (closure) => {
  const uri =
    "mongodb+srv://mug-user:carrot4mug@cluster0-qmj6q.mongodb.net/test?retryWrites=true&w=majority";
  return MongoClient.connect(
    uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) return console.log(err);
      let db = client.db("MUG-DB");
      closure(db);
    }
  );
};

// ///////////////
// user registration
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password -__v"); //  '-password -__v remove this dava from view
    res.send(users);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/user-profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password -__v"); //  '-password -__v remove this dava from view
    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
});


mongoose.connect(
  "mongodb+srv://mug-user:carrot4mug@cluster0-qmj6q.mongodb.net/test?retryWrites=true&w=majority", {
    useMongoClient: true,
  },
  (err) => {
    if (!err) console.log("connected to mongo");
  }
);
app.use('/auth', auth.router);


// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// database

// const categorySchema = {
//   name: String,
//   label: String,
//   iconClass: String
// }

// const category = new Category({"name": "teens", "label": "Для підлітків", "iconClass": "fas fa-dragon" });

// // category.save();

// const gameSchema = {
//   name: String,
//   category: [categorySchema],
//   description: String,
//   playersMinAge: Number,
//   playersCount: {
//     min: Number,
//     max: Number
//   },
//   playTimeMinutes: {
//     min: Number,
//     max: Number
//   },
//   instructionUrl: String,
//   photoUrl: [String]
// };

// const eventSchema = {
//   gameName: String,
//   game: gameSchema,
//   eventName: String,
//   description: String,
//   location: {
//     address: String,
//     geo: {
//       longitude: Number,
//       latitide: Number
//     }
//   },
//   dateTime: String,
//   duration: String,
//   players: {
//     age: {
//       min: Number,
//       max: Number
//     },
//     count: {
//       min: Number,
//       max: Number,
//       current: Number
//     },
//     experienceNeeded: String
//   }
// };

// const userSchema = {
//   personal: {
//     photoUrl: String,
//     name: String,
//     firstName: String,
//     lastName: String,
//     phone: String,
//     email: String,
//     location: {
//       address: String,
//       geo: {
//         longitude: Number,
//         latitide: Number
//       }
//     },
//     dateOfBirth: Number,
//     description: String,
//   },
//   events: {
//     subscribed: [eventSchema],
//     interested: [eventSchema],
//     created: [eventSchema],
//   },
//   games: {
//     favorited: [eventSchema], // game id's or some part of game objects
//     skillLevel:
//     {
//       novice: [eventSchema],
//       beginner: [eventSchema],
//       intermediate: [eventSchema],
//       advanced: [eventSchema]
//     },
//     rating: Number // likes counter form other users
//   }
// };

// const Event = mongoose.model('Event', eventSchema);
// const Game = mongoose.model('Game', gameSchema);
// const User = mongoose.model('User', userSchema);
// const Category = mongoose.model('Category', userSchema);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  message: null,
};

// Get events

router.get("/events_extended/:eventId", (req, res) => {
  let eventId = Number(req.params.eventId);
  connection((db) => {
    db.collection("events")
      .aggregate([{
          $match: {
            id: eventId,
          },
        },
        {
          $lookup: {
            from: "games",
            localField: "gameId",
            foreignField: "id",
            as: "game",
          },
        },
        {
          $unwind: "$game",
        },
      ])
      .next()
      .then((events) => {
        response.data = events;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.get("/events_extended", (req, res) => {
  connection((db) => {
    db.collection("events")
      .aggregate([{
          $lookup: {
            from: "games",
            localField: "gameId",
            foreignField: "id",
            as: "game",
          },
        },
        {
          $unwind: "$game",
        },
      ])
      .toArray()
      .then((events) => {
        response.data = events;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
  // Event.find({})
  // .then(events => {
  //         response.data = events;
  //         res.json(response);
  //       })
  //       .catch(err => {
  //         sendError(err, res);
  //       });
});

router.get("/events/:eventId", (req, res) => {
  let eventId = Number(req.params.eventId);
  connection((db) => {
    db.collection("events")
      .find({
        id: eventId,
      })
      .toArray()
      .then((events) => {
        response.data = events;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.get("/events", (req, res) => {
  connection((db) => {
    db.collection("events")
      .find()
      .toArray()
      .then((events) => {
        response.data = events;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.get("/categories", (req, res) => {
  connection((db) => {
    db.collection("games")
      .aggregate([{
          $group: {
            _id: null,
            category: {
              $addToSet: "$category",
            },
          },
        },
        {
          $addFields: {
            category: {
              $reduce: {
                input: "$category",
                initialValue: [],
                in: {
                  $setUnion: ["$$value", "$$this"],
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$category",
          },
        },
      ])
      .next()
      .then((categories) => {
        response.data = categories;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.get("/games", (req, res) => {
  connection((db) => {
    db.collection("games")
      .find()
      .toArray()
      .then((games) => {
        response.data = games;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.get("/games/:gameId", (req, res) => {
  let gameId = Number(req.params.gameId);
  connection((db) => {
    db.collection("games")
      .find({
        id: gameId,
      })
      .toArray()
      .then((games) => {
        response.data = games;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

router.post("/addevent", (req, res) => {
  connection((db) => {
    db.collection("events").insertOne(req.body);
  });
  console.log(req.body);
});

// connection(db => {
//   db.collection("events").deleteOne({id: 10});
// })

module.exports = router;
