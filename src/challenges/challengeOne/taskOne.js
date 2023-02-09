const getDistanceFromLatLonInKm = require('../../helpers/distanceFromLatLon');

function calculateCost(routes, rideServices, bookedServices) {
    const pricesArr = [];

    bookedServices.forEach((bookedServ) => { 
        const selectedRideService = rideServices.find(
            (rideServ) => rideServ.rideservice_id == bookedServ.rideservice_id
        );

        const selectedRoute = routes.find(
            (route) => route.location_id == bookedServ.location_id
        );

        pricesArr.push({
          rideService: selectedRideService.rideservice_name,
          location: selectedRoute.location_description,
          price:
            selectedRideService.priceperkm *
            getDistanceFromLatLonInKm(
              selectedRoute.start_coord_lat,
              selectedRoute.start_coord_long,
              selectedRoute.destination_coord_lat,
              selectedRoute.destination_coord_long
            ),
        });
    });

    return pricesArr;
}

module.exports = calculateCost;