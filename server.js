var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
    mongoose = require("mongoose"),
Item = require("./api/models/itemModel"), //created model loading here
    bodyParser = require("body-parser");

    mongoose.Promise = global.Promise;


    mongoose.connect("mongodb://localhost/itemdb", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/itemRoutes'); //importing route

routes(app); //register the route

app.listen(port);

console.log("bitcoin server started on: " + port);


app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
//middleware to redirect