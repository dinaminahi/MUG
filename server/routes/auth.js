const User = require("./models/User.js");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router()


//create
router.post('/signup', (req, res) => {
  const userData = req.body;

  let user = new User(userData);

  user.save((err, result) => {
    if (err) console.log("user error");

    res.status(200);
  });
})

//login
router.post('/signin', async (req, res) => {
  const loginData = req.body;
  const user = await User.findOne({
    email: loginData.email
  });

  if (!user)
    return res.status(401).send({
      message: "email or password - invalid",
    });

  bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
    if (!isMatch)
      return res.status(401).send({
        message: "email or password - invalid",
      });
    const payload = {
      sub: user._id //subject - id
    };
    const token = jwt.encde(payload, "123"); // hardcoded secret
    res.status(200).send({
      token
    });
  });
})

const auth = {
  router,
  checkAuthenticated: (req, res, next) => {
    if (!req.header('authorization'))
      return res.status(401).send({
        message: "Unauthoraized. Mssing Auth Header"
      })

    const token = req.header('authorization').split(' ')[1]
    const payload = jwt.decode(token, '123') //123 - hardcoding
    if (!payload)
      return res.status(401).send({
        message: "Unauthoraized. Auth Hedder Invalid"
      })
    req.userId = payload.sub
    next()
  }
}

module.exports = auth
