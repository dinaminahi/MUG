const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  text: String,
  canceledEvent: mongoose.ObjectId
});

module.exports = mongoose.model('Notification', notificationSchema);
