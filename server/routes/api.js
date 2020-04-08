const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");

const categorySchema = require('./categorySchema.js');
const gameSchema = require('./gameSchema.js');
const eventSchema = require('./eventSchema.js');
const userSchema = require('./userSchema.js');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;


// const connection = closure => {
//   const uri =
//     "mongodb+srv://mug-user:carrot4mug@cluster0-qmj6q.mongodb.net/test?retryWrites=true&w=majority";
//   return MongoClient.connect(
//     uri,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (err, client) => {
//       if (err) return console.log(err);
//       let db = client.db("MUG-DB");
//       closure(db);
//     }
//   );
// };


// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// database
mongoose.connect("mongodb+srv://diana-admin:dianadiana@cluster0-v29yw.mongodb.net/MUG");

const Event = mongoose.model('Event', eventSchema);
const Game = mongoose.model('Game', gameSchema);
const User = mongoose.model('User', userSchema);
const Category = mongoose.model('Category', categorySchema);



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
  message: null
};

// // Get events

// router.get("/events_extended/:eventId", (req, res) => {
//   let eventId = Number(req.params.eventId);
//   connection(db => {
//     db.collection("events")
//       .aggregate([
//         { $match: { id: eventId } },
//         {
//           $lookup: {
//             from: "games",
//             localField: "gameId",
//             foreignField: "id",
//             as: "game"
//           }
//         },
//         { $unwind: "$game" }
//       ])
//       .next()
//       .then(events => {
//         response.data = events;
//         res.json(response);
//       })
//       .catch(err => {
//         sendError(err, res);
//       });
//   });
// });


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
      ])
      .exec((err, events) => {
        response.data = events;
        res.json(response);
      })
    //   Student.aggregate([{
    //     $lookup: {
    //         from: "worksnapsTimeEntries", // collection name in db
    //         localField: "_id",
    //         foreignField: "student",
    //         as: "worksnapsTimeEntries"
    //     }
    // }]).exec(function(err, students) {
    //     // students contain WorksnapsTimeEntries
    // });
      // .catch(err => {
      //   sendError(err, res);
      // });
  });
  // Event.find({})
  // .then(events => {
  //         response.data = events;
  //         res.json(response);
  //       })
  //       .catch(err => {
  //         sendError(err, res);
  //       });


// router.get("/events/:eventId", (req, res) => {
//   let eventId = Number(req.params.eventId);
//   connection(db => {
//     db.collection("events")
//       .find({ id: eventId })
//       .toArray()
//       .then(events => {
//         response.data = events;
//         res.json(response);
//       })
//       .catch(err => {
//         sendError(err, res);
//       });
//   });
// });

router.get("/events", (req, res) => {
  Event.find({}, function(err, events){
        if (err) {
          sendError(err, res);
        } else {
          response.data = events;
          res.json(response);
        }
      })
});

// router.get("/categories", (req, res) => {
//   connection(db => {
//     db.collection("games")
//       .aggregate([
//         { $group: { _id: null, category: { $addToSet: "$category" } } },
//         {
//           $addFields: {
//             category: {
//               $reduce: {
//                 input: "$category",
//                 initialValue: [],
//                 in: { $setUnion: ["$$value", "$$this"] }
//               }
//             }
//           }
//         },
//         { $project: { _id: 0, category: "$category" } }
//       ])
//       .next()
//       .then(categories => {
//         response.data = categories;
//         res.json(response);
//       })
//       .catch(err => {
//         sendError(err, res);
//       });
//   });
// });

// router.get("/games", (req, res) => {
//   connection(db => {
//     db.collection("games")
//       .find()
//       .toArray()
//       .then(games => {
//         response.data = games;
//         res.json(response);
//       })
//       .catch(err => {
//         sendError(err, res);
//       });
//   });
// });

// router.get("/games/:gameId", (req, res) => {
//   let gameId = Number(req.params.gameId);
//   connection(db => {
//     db.collection("games")
//       .find({ id: gameId })
//       .toArray()
//       .then(games => {
//         response.data = games;
//         res.json(response);
//       })
//       .catch(err => {
//         sendError(err, res);
//       });
//   });
// });

// router.post("/addevent", (req, res) => {
//   connection(db => {
//     db.collection("events").insertOne(req.body);
//   });
//   const event = new Event({
//     name: req.body.name,
//     game: Game.find({_id: req.body.gameId})
//   })
//   console.log(req.body);
// });

// // connection(db => { 
// //   db.collection("events").deleteOne({id: 10});
// // })

module.exports = router;
