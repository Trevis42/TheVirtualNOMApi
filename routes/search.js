"use strict";

var fs = require("fs");
var express = require("express");
var router = express.Router();
var json = require("../queryResult.json");

const yelp = require("yelp-fusion");
const client = yelp.client(
  "UAoRvhpi0PKNClh1pDgb9OEKWeilv0DerV1lqHeaRWPjPXTkDQd3xfcg2gnOX2wAkpNL5yITDnlQzyrGc5CVTSrKo0U75xEkTg2O6Go4IXzzTMBkNuKVG1iiunDAXXYx "
);

// client.search({
// //   term: 'Four Barrel Coffee',
// radius: 20000,
// //   location: 'lat: 29.757241399999998, long:-95.46730649999999',
// latitude: 29.757241399999998,
// longitude: -95.46730649999999,

// }).then(response => {
//     fs.writeFile("./queryResult.json", JSON.stringify(response.jsonBody.businesses), (err) => {
//         if (err) {
//             console.error(err);
//             return;
//         };
//         console.log("File has been created");
//     });
//     // res.send(response.jsonBody.businesses);
//   console.log(response.jsonBody.businesses[0].name);
// }).catch(e => {
//   console.log(e);
// });

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  let addy = req.query.location;
  console.log("addy:", addy);
  // console.log("loc: ", address, "| radius:", rad)
  console.log("loc: ", req.query.location, "| radius:", req.query.radius);
  //* This is where we fetch the data...
  //? Need to pass in the info from front end to get the right info
  //? Need to figure out how to get lat/Long from zip
  client
    .search({
      //   term: 'Four Barrel Coffee',
      // radius: 20000,
      //   location: 'lat: 29.757241399999998 long:-95.46730649999999',
      // latitude: 29.757241399999998,
      // longitude: -95.46730649999999,
      location: req.query.location,
      radius: req.query.radius,
      // console.log("loc: ", location, "| radius:", radius)
    })
    .then(response => {
      fs.writeFile(
        "./queryResult.json",
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
