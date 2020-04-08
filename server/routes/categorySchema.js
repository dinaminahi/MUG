const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String,
    label: String,
    iconClass: String
  });

  module.exports = categorySchema;