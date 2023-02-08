const Ride = require("../models/rideModel");

class ReShape {
  constructor(rides) {
    this.rides = rides;
  }

  // Calculates the price for each ride
  refactorRides() {
    const results = this.rides.map((ride) => {
      const rideService = ride.service[0];
      const route = ride.location[0];
      const destination_coord_long = Number(route.destination_coord_long);
      const start_coord_long = Number(route.start_coord_long);
      const destination_coord_lat = Number(route.destination_coord_lat);
      const start_coord_lat = Number(route.start_coord_lat);

      // Haversine formula
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
      // Helper function for Haversine formula
      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }

      const distanceCovered = getDistanceFromLatLonInKm(
        start_coord_lat,
        start_coord_long,
        destination_coord_lat,
        destination_coord_long
      );

      const newRide = {
        ride_id: ride.ride_id,
        location_id: ride.location_id,
        rideservice_id: ride.rideservice_id,
        estimated_arrival_time: ride.estimated_arrival_time,
        serviceName: ride.service[0].rideservice_name,
        route: ride.location[0].location_description,
        price: distanceCovered * rideService.priceperkm,
      };
      return newRide;
    });
    return results;
  }
}

module.exports = ReShape;
