// This particular task was a bit vague to me , i didn't really understand what exactly
// we were ask to do but i did two implementations where you calculate the best price
// for each ride service based on the booked rides For example check which ride service
// with the best price for a ride from Agege to Eti-Osa or Surulere to Alimosho shopping spree
// and return an array that contains the ride service that have the best price for each trip

// and the second implementation which was acctually stipulated in the question was to calculate the
// best price and return an object of the ride service and the best price.

const calculateCost = require('./taskOne');

function findBestPriceForEachTrip(routes, rideServices, bookedServices) {
    const calculatedRoutesCost = calculateCost(
        routes,
        rideServices,
        bookedServices
    );

    const results = [];

    const locations = calculatedRoutesCost.map(routeCost => routeCost.location);
    const uLocations = new Set(locations);

    uLocations.forEach((loc) => {
        const locs = calculatedRoutesCost.filter((routeCost) => routeCost.location == loc);
        const allPrices = locs.map((routeCost) => Number(routeCost.price));
        const minPrice = Math.min(...allPrices);
        const selectedRideDetails = calculatedRoutesCost.find(
          (routeCost) => routeCost.price == minPrice
        );
        results.push({
          rideService: selectedRideDetails.rideService,
          location: loc,
          bestPrice: minPrice,
        });
    });
  return results;
}


function findBestPrice(routes, rideServices, bookedServices) {
  const calculatedRoutesCost = calculateCost(
    routes,
    rideServices,
    bookedServices
  );

  const allPrices = calculatedRoutesCost.map((routeCost) => Number(routeCost.price));
  const minPrice = Math.min(...allPrices);

  const selectedRideDetails = calculatedRoutesCost.find(
    (routeCost) => routeCost.price == minPrice
  );

  return {
    rideService: selectedRideDetails.rideService,
    location: selectedRideDetails.location,
    bestPrice: minPrice,
  };
}

module.exports = {
    findBestPrice,
    findBestPriceForEachTrip
};