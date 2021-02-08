"use strict";
module.exports = function (app) {
  var item = require("../controllers/itemController");

  // item Routes
  app.route("/items").get(item.list_all_items).post(item.create_an_item);

  app
    .route("/items/:itemId")
};
