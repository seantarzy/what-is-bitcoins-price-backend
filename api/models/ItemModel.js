"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

require("dotenv").config();

var ItemSchema = new Schema({
  title: {
    type: String,
    required: "Kindly enter the name of the item",
  },
  image: {
    type: String,
    default: null,
  },
  price: {type: String}
});

module.exports = mongoose.model("Items", ItemSchema);