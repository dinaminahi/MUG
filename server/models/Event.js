const mongoose = require("mongoose");

module.exports = mongoose.model('Event', {
  gameName: String,
  game: gameSchema,
  eventName: String,
  description: String,
  location: {
    address: String,
    geo: {
      longitude: Number,
      latitide: Number
    }
  },
  dateTime: String,
  duration: String,
  players: {
    age: {
      min: Number,
      max: Number
    },
    count: {
      min: Number,
      max: Number,
      current: Number
    },
    experienceNeeded: String
  }
})
