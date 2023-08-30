const csvToJson = require('../../helpers/csvToJson');
const calculateCost = require('./taskOne');
const { findBestPrice, findBestPriceForEachTrip } = require('./taskTwo');

const routesArr = csvToJson('data/locations.csv');
const rideServiceArr = csvToJson('data/rideservices.csv');
const bookedServiceArr = csvToJson('data/rides.csv');

// challenge one , task one

console.log('Task One');

const costOfEachRide = calculateCost(
  routesArr,
  rideServiceArr,
  bookedServiceArr
);

console.log(costOfEachRide);

//challenge one , task two

console.log('Task Two')

const overallBestPrice = findBestPrice(
  routesArr,
  rideServiceArr,
  bookedServiceArr
);

console.log(overallBestPrice);

const bestPriceForEachTrip = findBestPriceForEachTrip(
  routesArr,
  rideServiceArr,
  bookedServiceArr
);

console.log(bestPriceForEachTrip);
