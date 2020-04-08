const mongoose = require("mongoose");

module.exports = mongoose.model('User', {
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
        latitide: Number
      }
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
      advanced: [eventSchema]
    },
    rating: Number // likes counter form other users
  }
})
