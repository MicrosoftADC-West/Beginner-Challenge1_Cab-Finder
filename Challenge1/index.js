// convert csvs to json
const { getJson } = require("./helpers/convertCsvToJson");
const { getDistanceFromLatLonInKm } = require("./helpers/calculateDistance");
const locationsJson = getJson("locations.csv");
const ridesJson = getJson("rides.csv");
const rideservicesJson = getJson("rideservices.csv");

const getRideDetails = (locations, rides, rideservices) => {
  // calculate cost of each ride
  const detailedRides = rides.map(ride => {
    // get the distance covered of this ride
    // by using it's location ID

    const foundLocation = locations.find(location => location.location_id === ride.location_id);

    const locationDistance = getDistanceFromLatLonInKm(
      foundLocation.start_coord_lat,
      foundLocation.start_coord_long,
      foundLocation.destination_coord_lat,
      foundLocation.destination_coord_long
    );

    // calculate price
    // find the ride services with the ride service ID

    const foundRideService = rideservices.find(
      rideservice => rideservice.rideservice_id === ride.rideservice_id
    );

    const ridePrice = foundRideService.priceperkm * locationDistance;

    return {
      ...ride,
      price: ridePrice
    };
  });

  return detailedRides;
};

const getBestRideService = (locations, rides, rideservices) => {
  const rideDetails = getRideDetails(locations, rides, rideservices);
  const allPrices = rideDetails.map(detail => Number(detail.price));
  const minPrice = Math.max(...allPrices);

  // find ride with lowest price
  const foundRide = rideDetails.find(ride => ride.price === minPrice);

  // get the ride service
  const foundRideService = rideservices.find(
    rideservice => rideservice.rideservice_id === foundRide.rideservice_id
  );

  return {
    rideService: foundRideService.rideservice_name,
    bestPrice: foundRide.price
  };
};

const getBestRideServiceForEachTrip = (locations, rides, rideservices) => {
  const rideDetails = getRideDetails(locations, rides, rideservices);

  return rideDetails.map(rideDetail => {
    // get distance covered for this ride

    const foundLocation = locations.find(
      location => location.location_id === rideDetail.location_id
    );

    const locationDistance = getDistanceFromLatLonInKm(
      foundLocation.start_coord_lat,
      foundLocation.start_coord_long,
      foundLocation.destination_coord_lat,
      foundLocation.destination_coord_long
    );

    // find best ride service
    // get possible prices

    const detailedRideService = rideservices.map(rideService => ({
      ...rideService,
      estimatedPrice: rideService.priceperkm * locationDistance
    }));

    const allPrices = detailedRideService.map(detail => Number(detail.estimatedPrice));
    const minPrice = Math.min(...allPrices);

    // find service with lowest price
    const foundMinService = detailedRideService.find(ride => ride.estimatedPrice === minPrice);

    return {
      ...rideDetail,
      rideService: foundMinService.rideservice_name,
      price: foundMinService.estimatedPrice
    };

    // console.log(detailedRideService);
  });
};

// const rideDetails = getRideDetails(locationsJson, ridesJson, rideservicesJson);

// console.log(rideDetails);

// get best price
const bestRide = getBestRideServiceForEachTrip(locationsJson, ridesJson, rideservicesJson);

console.log(bestRide);
