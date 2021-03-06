const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  game: String,
  eventName: String,
  description: String,
  location: {
    address: String,
    geo: {
      longitude: Number,
      latitude: Number
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
    experience: String,
    joined: [mongoose.ObjectId]
  },
  organizer: mongoose.ObjectId,
  canceled: Boolean,
  commentsId: [mongoose.ObjectId]
});

module.exports = mongoose.model('Event', eventSchema);
