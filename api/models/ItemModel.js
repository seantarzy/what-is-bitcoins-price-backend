"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var unirest = require("unirest");
var nconf = require("nconf");

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

let Item = mongoose.model("Items", ItemSchema);


let date = new Date();

let fullYear = date.getFullYear();

let day = date.getDate();

let month = date.getMonth();

let items;

date = `${month}/${day}/${fullYear}`;

nconf.use("file", { file: "./config.json" });
nconf.load();

if (nconf.get("month") != month) {
  nconf.set("date", date);
  nconf.set("month", month);
  nconf.save(function (err) {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log("Configuration saved successfully.");
  });

  Item.deleteMany();

  var req = unirest(
    "GET",
    "https://amazon-price.p.rapidapi.com/azapi-azSearch"
  );

  req.query({
    prime: "false",
    query: "affiliate marketing",
    page: "1",
  });

  req.headers({
    "x-rapidapi-key": process.env["x-rapidapi-key"],
    "x-rapidapi-host": "amazon-price.p.rapidapi.com",
    useQueryString: true,
  });
  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    items = res.body.results;
    console.log("items", items);
    items.forEach((item) => {
      var secondReq = unirest(
        "GET",
        "https://amazon-price.p.rapidapi.com/azapi-bulkPrice"
      );

      secondReq.query({
        asins: item.asin,
        marketplace: "US",
      });

      secondReq.headers({
        "x-rapidapi-key": process.env["x-rapidapi-key"],
        "x-rapidapi-host": "amazon-price.p.rapidapi.com",
        useQueryString: true,
      });

      secondReq.end(async function () {
        if (res.error) throw new Error(res.error);

        const amazonItem = new Item({
          title: res.body[`${item.asin}`]["title"],
          price: res.body[`${item.asin}`]["price"],
          image: res.body[`${item.asin}`]["image"],
        });

        try {
          const result = await amazonItem.save();
          console.log(result);
        } catch (ex) {
          console.log("couldn't create because ", ex.errors);
        }
      });
    });
  });
}

module.exports = Item