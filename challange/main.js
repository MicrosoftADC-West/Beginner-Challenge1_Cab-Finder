console.log("in main.js");
var fs = require("fs");
var path = require("path");

var locationsData = require("../challange/Data/JSON/locations.json");
var ridesData = require("../challange/Data/JSON/rides.json");
var rideServicesData = require("../challange/Data/JSON/rideServices.json");

const ridesPrices = [];

function CalculateRidePrice(routes, rideServices) {
  const rideWithLocationsInKm = [];

  let i = 0;
  for (const element of routes) {
    i++;
    rideWithLocationsInKm.push({
      location: i,
      distanceInKm: getDistanceFromLatLonInKm(
        element.start_coord_lat,
        element.start_coord_long,
        element.destination_coord_lat,
        element.destination_coord_long
      ).toFixed(2),
    });
  }
  i = 0;
  for (const element of ridesData) {
    i++;
    ridesPrices.push({
      ride_id: i,
      price: CalculetePricePerKm(element, rideWithLocationsInKm, rideServices),
    });
  }
  return ridesPrices;
}

function CalculetePricePerKm(element, rideWithLocationsInKm, rideServices) {
  let forRideInKm = rideWithLocationsInKm.find(
    (item) => item.location === element.location
  );
  let forRideservice = rideServices.find(
    (item) => item.rideservice_id === element.rideservice_id
  );
  return (forRideInKm.distanceInKm * forRideservice.price_per_km).toFixed(3);
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

console.log(CalculateRidePrice(locationsData, rideServicesData));
