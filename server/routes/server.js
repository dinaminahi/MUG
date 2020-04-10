const express = require("express")
const app = express()
const cors = require("cors");

// const router = express.Router();
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const auth = require('./auth.js')
// const jwt = require("jsonwebtoken");

app.use(cors());
// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: false,
//   })
// );
// app.use(bodyParser.json());

app.post('/register', (req, res) => {
  console.log(req.body)
})


// const User = require("./models/User.js");

// mongoose.Promise = Promise;

// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find({}, "-password -__v"); //  '-password -__v remove this dava from view
//     res.send(users);
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });

// app.get("/user-profile/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id, "-password -__v"); //  '-password -__v remove this dava from view
//     res.send(user);
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });


// mongoose.connect(
//   "mongodb+srv://mug-user:carrot4mug@cluster0-qmj6q.mongodb.net/test?retryWrites=true&w=majority", {
//     useMongoClient: true,
//   },
//   (err) => {
//     if (!err) console.log("connected to mongo");
//   }
// );
// app.use('/auth', auth.router);

// app.listen(3000)
