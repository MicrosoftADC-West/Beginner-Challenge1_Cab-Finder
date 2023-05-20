const fs = require("fs");
const path = require("path");

class SkillChallenge {
  constructor() {
    this.locations;
    this.rideServices;
    this.bookedRides;
    this.fetchAndParseData();
  }
  // Parses the data from the JSON files in the data folder
  fetchAndParseData() {
    this.locations = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "Data", "Data", "JSON", "locations.json")
      )
    );
    this.bookedRides = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "Data", "Data", "JSON", "rides.json")
      )
    );
    this.rideServices = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "Data", "Data", "JSON", "rideservices.json")
      )
    );
  }

  // Calculates the price for each ride
  calculateRidePrices() {
    const rideServicesObj = {};
    const locationsObj = {};

    // Create a lookup Object for rideServices and locations
    this.rideServices.forEach((rideService) => {
      rideServicesObj[rideService.rideservice_id] = rideService;
    });

    this.locations.forEach((location) => {
      locationsObj[location.location_id] = location;
    });

    // Map over bookedRides and calculate the price for each ride
    const results = this.bookedRides.map((ride) => {
      const rideSrv = rideServicesObj[ride.rideservice_id];
      const route = locationsObj[ride.location_id];

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

      return {
        ride_id: ride.ride_id,
        rideService: rideSrv.rideservice_name,
        distanceCovered,
        route: route.location_description,
        estimated_arrival_time: ride.estimated_arrival_time,
        price: distanceCovered * rideSrv.priceperkm,
      };
    });

    return results;
  }

  // Creates an object with the best price for each ride
  getBestPrice() {
    const rides = this.calculateRidePrices();
    const rideservices = this.rideServices;
    const locations = this.locations;

    const results = {};

    rides.forEach((ride) => {
      if (!results[ride.route]) {
        results[ride.route] = {
          bestRideService: {
            ride_service_name: ride.rideService,
            price: ride.price,
          },
        };
      } else if (ride.price < results[ride.route].price) {
        results[ride.route] = {
          bestRideService: {
            ride_service_name: ride.rideService,
            price: ride.price,
          },
        };
      }
    });

    return results;
  }
}

module.exports = SkillChallenge;
