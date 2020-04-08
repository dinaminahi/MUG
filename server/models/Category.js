const mongoose = require("mongoose");

module.exports = mongoose.model('Category', {
  name: String,
  label: String,
  iconClass: String
})
