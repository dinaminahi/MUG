const mongoose = require("mongoose");

module.exports = mongoose.model('Event', {
  name: String,
  category: [categorySchema],
  description: String,
  playersMinAge: Number,
  playersCount: {
    min: Number,
    max: Number
  },
  playTimeMinutes: {
    min: Number,
    max: Number
  },
  instructionUrl: String,
  photoUrl: [String]
})
