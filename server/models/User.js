const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const userShema = new mongoose.Schema({
  email: String,
  password: String,
  personal: {
    photoUrl: String,
    nickName: String,
    firstName: String,
    lastName: String,
    phone: String,
    location: {
      address: String,
      geo: {
        longitude: Number,
        latitide: Number,
      },
    },
    dateOfBirth: Number,
    description: String,
  },
  events: {
    subscribed: [eventSchema],
    interested: [eventSchema],
    created: [eventSchema],
  },
  games: {
    favorited: [eventSchema], // game id's or some part of game objects
    skillLevel: {
      novice: [eventSchema],
      beginner: [eventSchema],
      intermediate: [eventSchema],
      advanced: [eventSchema],
    },
    rating: Number, // likes counter form other users
  },
});

userShema.pre("save", function (next) {
  const user = this;

  if (!user.isNotModefied("password")) return next();
  bcrypt.hash(user.password, null, null, (err, hash) => {
    if (err)
      return next(err);
    user.password = hash;
    next();
  });
});
module.exports = mongoose.model("User", userShema);
