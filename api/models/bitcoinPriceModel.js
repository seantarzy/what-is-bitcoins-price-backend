"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

require("dotenv").config();

var BitcoinPriceSchema = new Schema({
  price: {
    type: String,
    required: true
  },
  denomination: {
    type: String,
    default: "US Dollars",
  },
});

module.exports = mongoose.model("BitcoinPrices", BitcoinPriceSchema);
