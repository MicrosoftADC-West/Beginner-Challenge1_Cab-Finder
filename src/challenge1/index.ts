import { getRides, getRideServices, getLocations } from "./helpers";
import { getPriceForEachRide } from "./getPriceForEachRide";
import { getBestRideForEachRoute } from "./getBestPrice";
import { RidePrice } from "./types";
function main() {
  // Challenge 1
  const rides = getRides();
  const ridesServices = getRideServices();
  const locations = getLocations();
  const priceForEachRide: RidePrice[][] = getPriceForEachRide(
    locations,
    ridesServices,
    rides
  );
  const bestRideForEachRoute = getBestRideForEachRoute(
    locations,
    ridesServices,
    rides
  );

  const challenge1 = {
    task1: priceForEachRide,
    task2: bestRideForEachRoute,
  };

  // challenge 2
  console.log(challenge1);
  return challenge1;
}

main();
