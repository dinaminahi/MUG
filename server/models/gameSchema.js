const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: String,
  categories: [Object],
  description: String,
  playersMinAge: Number,
  playersCount: {
    min: Number,
    max: Number,
  },
  playTimeMinutes: {
    min: Number,
    max: Number,
  },
  instructionUrl: String,
  photoUrl: [String],
});

module.exports = mongoose.model("Game", gameSchema);
