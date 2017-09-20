// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require(`fs`);

var table = require(`./data/table.js`);
var waitlist = require(`./data/waitlist.js`);

// Routes
// =============================================================

var htmlRoutes = function(app) {
  // Basic route that sends the user to the home page
  app.get("/", function(req, res) {
    console.log(`trying the /index path`);
    res.sendFile(path.join(__dirname, "view.html"));
  });
  app.get("/home", function(req, res) {
    console.log(`trying the /index path`);
    res.sendFile(path.join(__dirname, "view.html"));
  });
  app.get("/reserve", function(req, res) {
    console.log(`trying the /reserve path`);
    res.sendFile(path.join(__dirname, "reserve.html"));
  });
  app.get("/table", function(req, res) {
    console.log(`trying the /table path`);
    res.sendFile(path.join(__dirname, "table.html"));
  });
  // make css stylesheet accessible
  app.get("/css/style.css", function(req, res) {
    console.log(`trying the /css/style path`);
    res.sendFile(path.join(__dirname, "css/style.css"));
  });
}
var jsonRoutes = function(app) {
  console.log(`json routes are fine`);
  // Displays all tables
  app.get("/api/table", function(req, res) {
    res.json(table);
  });

  // Displays all waitlist
  app.get("/api/waitlist", function(req, res) {
    res.json(waitlist);
  });
}

var postNewData = function(app) {
  console.log(`attempting to post data`);
  app.post('/', function (req, res) {
    res.send('Got a POST request')
  })
  // Create New Customers - takes in JSON input
  app.post("/api/new", function(req, res) {
    var newcustomer = req.body;
    console.log(newcustomer);
    // if table array is more than 5 long
    // then next entries go into waitlist file
    if (table.length < 5) {
      table.push(newcustomer);
      fs.writeFile(
        'data/table.js',
        `var tableObject = ` + JSON.stringify(table, null, 2) + `; module.exports = tableObject;`,
        function (err) {
        if (err) throw err;
        console.log(`Added ${newcustomer.customerName} to table.js`);
      });
    } else {
      waitlist.push(newcustomer);
      fs.writeFile(
        'data/waitlist.js',
        `var waitlistObject = ` + JSON.stringify(waitlist, null, 2) + `; module.exports = waitlistObject;`,
        function (err) {
        if (err) throw err;
        console.log(`Added ${newcustomer.customerName} to waitlist.js`);
      });
    }

    res.json(newcustomer);
    // res.send(newcustomer);
  });
}

exports.htmlRoutes = htmlRoutes;
exports.jsonRoutes = jsonRoutes;
exports.postNewData = postNewData;
