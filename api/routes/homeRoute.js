module.exports = function (app) {
  var home = require("../controllers/homeController");

  app
    .route("/")
    //  console.log("trying to get with routes")
    .get(home.welcome)
};
