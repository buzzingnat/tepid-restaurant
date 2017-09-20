// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Other Files
// =============================================================
var table = require(`./data/table.js`);
console.log(`file`, table[0].customerName);
var waitlist = require(`./data/waitlist.js`);
console.log(`file`, waitlist[0].phoneNumber);
var routes = require(`./routing`);

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

routes.htmlRoutes(app);
routes.jsonRoutes(app);
routes.postNewData(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
