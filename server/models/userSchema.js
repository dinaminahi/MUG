const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const notificationSchema = require('./notificationSchema');

let userSchema = new Schema({
  password: String,
  email: {
    type: String,
    unique: true
  },
  personal: {
    photoUrl: String,
    name: String,
    firstName: String,
    lastName: String,
    phone: String,
    location: {
      address: String,
      geo: {
        longitude: Number,
        latitude: Number
      }
    },
    dateOfBirth: Number,
    description: String
  },
  events: {
    subscribed: [mongoose.ObjectId],
    interested: [mongoose.ObjectId],
    created: [mongoose.ObjectId]
  },
  games: {
    favorited: [mongoose.ObjectId], // game id's or some part of game objects
    skillLevel: {
      novice: [mongoose.ObjectId],
      beginner: [mongoose.ObjectId],
      intermediate: [mongoose.ObjectId],
      advanced: [mongoose.ObjectId]
    },
    rating: Number // likes counter form other users
  },
  notifications: [notificationSchema]
});

userSchema.plugin(uniqueValidator, {
  message: 'Email already in use.'
});

module.exports = mongoose.model('User', userSchema);
