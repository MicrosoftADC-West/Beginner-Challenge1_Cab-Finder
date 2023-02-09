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
  

function getBestRideForEachRoute(routes, rideService, bookedRide) {
  const temp = [];

  return bookedRide.map((bookedRide) => {
    let bestPrice = { price: Infinity, serviceName: "" };

    const locationId = bookedRide.location_id;
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

    const distanceInKm = getDistanceFromLatLonInKm(
      start_coord_lat,
      start_coord_long,
      destination_coord_lat,
      destination_coord_long
    );

    rideService.forEach((ride) => {
      const rideServiceRate = parseInt(ride?.priceperkm);

      const priceForRide = rideServiceRate * distanceInKm;

      if (priceForRide < bestPrice?.price) {
        bestPrice = {
          serviceName: ride.rideservice_name,
          price: priceForRide,
        };
      }
    });

    return { ...bestPrice, ride: bookedRide.ride_id };
  });
}

console.log(getBestRideForEachRoute(locations, rideservices, files));
