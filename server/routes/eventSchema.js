const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    game: String,
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
    },
    organizer: Number,
    canceled: Boolean
  });
  
module.exports = eventSchema;