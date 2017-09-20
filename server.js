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
// console.log(`Stuff should be loaded`);
htmlRoutes();
// console.log(`After the htmlRoutes function`)

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Routes
// =============================================================

  // Basic route that sends the user first to the AJAX Page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });

  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });

  app.get("/table", function(req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
  });

  // Displays all tables
  app.get("/api/table", function(req, res) {
    res.json(table);
  });

  // Displays all waitlist
  app.get("/api/waitlist", function(req, res) {
    res.json(waitlist);
  });

/*

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:characters?", function(req, res) {
  var chosen = req.params.characters;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < characters.length; i++) {
      if (chosen === characters[i].routeName) {
        return res.json(characters[i]);
      }
    }
    return res.json(false);
  }
  return res.json(characters);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  var newcharacter = req.body;
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  characters.push(newcharacter);

  res.json(newcharacter);
});
*/

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
