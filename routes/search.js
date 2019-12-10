"use strict";

var fs = require("fs");
var express = require("express");
var router = express.Router();
var json = require("../queryResult.json");

const yelp = require("yelp-fusion");
const client = yelp.client(
  "UAoRvhpi0PKNClh1pDgb9OEKWeilv0DerV1lqHeaRWPjPXTkDQd3xfcg2gnOX2wAkpNL5yITDnlQzyrGc5CVTSrKo0U75xEkTg2O6Go4IXzzTMBkNuKVG1iiunDAXXYx"
);

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  let addy = req.query.location;
  console.log("addy:", addy);
  console.log("loc: ", req.query.location, "| radius:", req.query.radius);
  //* This is where we fetch the data...
  //? Need to pass in the info from front end to get the right info
  //? Get lat/Long from zip??
  client
    .search({
      location: req.query.location,
      limit: req.query.limit,
      offset: req.query.offset,
      radius: req.query.radius,
      sort_by: req.query.sort_by,
    })
    .then(response => {
      fs.writeFile(
        "../queryResult.json",
        JSON.stringify(response.jsonBody.businesses),
        err => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("File has been created");
        }
      );
      res.send(response.jsonBody.businesses);
      console.log(response.jsonBody.businesses[0].name);
    })
    .catch(e => {
      console.log(e);
    });
  // res.send(json);
});

module.exports = router;
