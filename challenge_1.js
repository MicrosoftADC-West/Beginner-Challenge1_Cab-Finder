const csvToJson = require("convert-csv-to-json");
const locations = require('./Data/JSON/locations.json');


function convertToJson(csv) {
    const json = csvToJson.getJsonFromCsv("./Data/CSV/locations.csv");
    const result = [];

    for (i = 0; i < json.length; i += 1) {
      const keysArr = Object.keys(json[i])[0].split(",");
      const valuesArr = Object.values(json[i])[0].split(",");

      currObj = {};
      for (j = 0; j < keysArr.length; j += 1) {
        currObj[keysArr[j]] = valuesArr[j];
      }

      result.push(currObj);
    }

    return result;
}


const json = convertToJson()

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


const distanceBetweenLocations = locations.map((route) => {
    const distance = getDistanceFromLatLonInKm(route.start_coord_lat, route.start_coord_long, route.destination_coord_lat, route.destination_coord_long);

    return distance
})


console.log(distanceBetweenLocations)

// function getDetailsOfRideWithPrice(listOfRoutes, listOfRideServices, listOfBookedRides) { 
//     const detailsOfRides = [];

    
// }

