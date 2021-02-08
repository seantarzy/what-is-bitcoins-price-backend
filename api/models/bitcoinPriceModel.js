"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

require("dotenv").config();
const puppeteer = require("puppeteer");

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


BitcoinPriceSchema.statics.scrapePrice = async function (currency) {
    console.log("scraping yo")
  console.log(currency);
  let googleUrl = `https://www.google.com/search?q=bitcoin+price+in+${currency}&rlz=1C5CHFA_enUS879US879&oq=bitcoin+pri&aqs=chrome.0.35i39i457j69i57j0i131i433j0i20i131i263i433j0i131i433l4.1883j0j4&sourceid=chrome&ie=UTF-8`;
  let browser = await puppeteer.launch({ headless: true });
  let page = await browser.newPage();
  await page.goto(googleUrl, { waitUntil: "networkidle2" });

  let data = await page.evaluate(() => {
    let priceData = document.querySelector(
      'div[class="g obcontainer"]  div[class="b1hJbf"]'
    ).innerText;

    let priceValue = document.querySelector(
      'div[class="g obcontainer"]  input[class="a61j6 vk_gy vk_sh Hg3mWc"]'
    ).value;

    return { priceData: priceData, priceValue: priceValue };
  });
  return data;
};

module.exports = mongoose.model("BitcoinPrices", BitcoinPriceSchema);



