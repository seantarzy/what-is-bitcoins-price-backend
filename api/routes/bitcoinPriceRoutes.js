
    // var express = require("express"),
    // app = express();

module.exports = function(app) {
var bitcoinPrice = require("../controllers/bitcoinPriceController");


 app.route("/price")
    //  console.log("trying to get with routes")
       .get(bitcoinPrice.getCurrentPrice);
}