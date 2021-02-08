"use strict";

var mongoose = require("mongoose"),
  BitcoinPrice = require("../models/bitcoinPriceModel");

exports.getCurrentPrice = async function (req, res) {
    console.log("trying to get with controller")
     let data
      if(req.headers.currency){
     data = await BitcoinPrice.scrapePrice(req.headers.currency)
      }
      else{
        data = await BitcoinPrice.scrapePrice("us dollars")
      }
      if(data){
       res.json(data);
      }
      else{
          res.json("couldn't get your price")
      }
  };


// exports.create_an_item = function (req, res) {
//   var new_task = new Task(req.body);
//   new_task.save(function (err, task) {
//     if (err) res.send(err);
//     res.json(task);
//   });
// };