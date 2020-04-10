const express = require("express")
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const router = express.Router();
// const auth = require('./auth.js')
// const jwt = require("jsonwebtoken");

app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: false,
//   })
// );

app.post('/register', (req, res) => {

  const userData = req.body;

  let user = new User(userData);

  user.save((err, newUser) => {
    if (err)
      return res.status(500).send({
        message: "Error saving user",
      });
    createSendToken(res, newUser)
  });
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


mongoose.connect("mongodb+srv://mug-user:carrot4mug@cluster0-qmj6q.mongodb.net/test?retryWrites=true&w=majority", (err) => {
  if (!err)
    console.log("connected to mongo")
})

app.use('/auth', auth.router);

app.listen(3000)
