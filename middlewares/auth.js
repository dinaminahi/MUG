const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../models/User");
const authorize = require("../middlewares/auth");
const {
  check,
  validationResult
} = require('express-validator');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "longer-secret-is-better");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed!"
    });
  }
};

// Get User Profile
router.route('/user-profile/:id').get(authorize, (req, res, next) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
