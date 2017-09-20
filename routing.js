// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// var fs = require(`fs`);

var table = require(`./data/table.js`);
var waitlist = require(`./data/waitlist.js`);

// Routes
// =============================================================

var htmlRoutes = function(app) {
  console.log(`html routes are fine`);
  // Basic route that sends the user first to the AJAX Page
  app.get("/", function(req, res) {
    console.log(`trying the /index path`);
    res.sendFile(path.join(__dirname, "view.html"));
  });
  app.get("/reserve", function(req, res) {
    console.log(`trying the /reserve path`);
    res.sendFile(path.join(__dirname, "reserve.html"));
  });
  app.get("/table", function(req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
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



// if table array is more than 5 long, then next entries go into waitlist file

var postNewData = function(app) {
  console.log(`attempting to post data`);
  app.post('/', function (req, res) {
    res.send('Got a POST request')
  })
  // Create New Customers - takes in JSON input
  app.post("/api/new", function(req, res) {
    var newcustomer = req.body;

    console.log(newcustomer);
    console.log(`new customer is running`);
    if (tables.length < 5) {
      tables.push(newcustomer);
      fs.writeFile('data/table.js', JSON.stringify(tables), function (err) {
        if (err) throw err;
        console.log(`Added ${newcustomer.customerName} to table.js`);
      });
    } else {
      waitlist.push(newcustomer);
      fs.writeFile('data/waitlist.js', JSON.stringify(waitlist), function (err) {
        if (err) throw err;
        console.log(`Added ${newcustomer.customerName} to waitlist.js`);
      });
    }

    res.json(newcustomer);
    res.send(newcustomer);
  });
}

exports.htmlRoutes = htmlRoutes;
exports.jsonRoutes = jsonRoutes;
exports.postNewData = postNewData;
