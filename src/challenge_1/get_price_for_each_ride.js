const files = require("./JSON/rides.json");
const rideservices = require("./JSON/rideservices.json");
const locations = require("./JSON/locations.json");

// conversion of cordinates to kilometers
function deg2rad(deg) {
  return deg * (Math.PI / 180);
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

function getPriceForEachRide(routes, rideService, bookedRide) {
  const bookedRideAndPrice = [];

  // iterate over all booked rides.
  return bookedRide.map((bookedRide) => {
    // get the location id, rideservice id.
    const locationId = bookedRide.location_id;
    const rideSercviceId = bookedRide.rideservice_id;

    // find routes with location id
    const route = routes.find((route) => route.location_id === locationId);

    let {
      start_coord_lat,
      start_coord_long,
      destination_coord_lat,
      destination_coord_long,
    } = route;

    start_coord_lat = parseFloat(start_coord_lat);
    start_coord_long = parseFloat(start_coord_long);
    destination_coord_lat = parseFloat(destination_coord_lat);
    destination_coord_long = parseFloat(destination_coord_long);

    // calculate distance in kilometer using the helper function.
    const distanceInKm = getDistanceFromLatLonInKm(
      start_coord_lat,
      start_coord_long,
      destination_coord_lat,
      destination_coord_long
    );

    // using rideserives id check the rideService being used
    const rideServiceUsed = rideService.find(
      (service) => service.rideservice_id === rideSercviceId
    );
    // get the 'pricePerKm'
    const rideServiceRate = parseInt(rideServiceUsed?.priceperkm);

    const priceForRide = rideServiceRate * distanceInKm;

    const newRideDetails = {
      ride_id: bookedRide.ride_id,
      location_id: locationId,
      rideservice_id: rideSercviceId,
      estimated_arrival_time: bookedRide.estimated_arrival_time,
      price: priceForRide,
    };

    bookedRideAndPrice.push(newRideDetails);

    return bookedRideAndPrice;
  });
}

console.log(getPriceForEachRide(locations, rideservices, files));
