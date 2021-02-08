"use strict";

var mongoose = require("mongoose"),
  Item = mongoose.model("Items");


exports.list_all_items = function (req, res) {
  Item.find({}, function (err, item) {
    if (err) res.send(err);
    res.json(item);
  });
};


exports.create_an_item = function (req, res) {
  var new_task = new Task(req.body);
  new_task.save(function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};
