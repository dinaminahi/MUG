const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: String,
    date: String,
    userId: mongoose.ObjectId,
    eventId: mongoose.ObjectId
  });

  module.exports = mongoose.model('Comment', commentSchema);
