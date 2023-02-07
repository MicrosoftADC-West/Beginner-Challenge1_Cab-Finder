const express = require('express');
const app = express();

const csvToJson = require('convert-csv-to-json');

function convertCsvToJson(fileName) {
    const json = csvToJson.getJsonFromCsv(fileName);

    const result = [];

    for (i = 0; i < json.length; i += 1) {
      const keysArr = Object.keys(json[i])[0].split(',');
      const valuesArr = Object.values(json[i])[0].split(',');

      currObj = {};
      for (j = 0; j < keysArr.length; j += 1) {
        currObj[keysArr[j]] = valuesArr[j];
      }

      result.push(currObj);
    }

    return result;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function calculateCost(routes, rideServices, bookedServices) {
    const pricesArr = [];

    routes.forEach((loc) => {
        bookedServices.forEach((bookedServ) => {
            pricesArr.push({
                rideService: rideServices.find(
                    (ride) => ride.rideservice_id == bookedServ.rideservice_id
                ).rideservice_name,
                location: routes.find(
                    (route) => route.location_id == bookedServ.location_id
                ).location_description,
                price:
                    rideServices.find(
                        (serv) => serv.rideservice_id == bookedServ.rideservice_id
                    ).priceperkm *
                    getDistanceFromLatLonInKm(
                        loc.start_coord_lat,
                        loc.start_coord_long,
                        loc.destination_coord_lat,
                        loc.destination_coord_long
                    ),
            });
        });
    });

    return pricesArr;
}

const routesArr = convertCsvToJson('locations.csv');
const rideServiceArr = convertCsvToJson('rideservices.csv');
const bookedServiceArr = convertCsvToJson('rides.csv');


function challengeOneTaskOne() {
    console.log(calculateCost(routesArr, rideServiceArr, bookedServiceArr));
}

function challengeOneTaskTwo(routesArr, rideServiceArr, bookedServiceArr) {
    const taskOneResult = calculateCost(
        routesArr,
        rideServiceArr,
        bookedServiceArr
    );
}

challengeOneTaskOne();

module.exports = app;