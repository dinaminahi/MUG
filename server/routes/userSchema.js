const mongoose = require("mongoose");
const eventSchema = require('./eventSchema.js');

const userSchema = new mongoose.Schema({
    personal: {
      photoUrl: String,
      name: String,
      firstName: String,
      lastName: String,
      phone: String,
      email: String,
      location: {
        address: String,
        geo: {
          longitude: Number,
          latitude: Number
        }
      },
      dateOfBirth: String,
      description: String,
    },
    events: {
      subscribed: [mongoose.ObjectId],
      interested: [mongoose.ObjectId],
      created: [mongoose.ObjectId],
    },
    games: {
      favorited: [mongoose.ObjectId], // game id's or some part of game objects
      skillLevel:
      {
        novice: [mongoose.ObjectId],
        beginner: [mongoose.ObjectId],
        intermediate: [mongoose.ObjectId],
        advanced: [mongoose.ObjectId]
      },
      rating: Number // likes counter form other users
    }
  });

module.exports = userSchema;