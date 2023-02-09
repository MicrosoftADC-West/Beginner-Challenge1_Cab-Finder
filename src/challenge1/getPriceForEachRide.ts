import { haversine_distance } from "./helpers";
import { Routes, RideService, Ride, RidePrice } from "./types";

/**
 * @description Returns the best price for each ride.
 * @param {Routes[]} routes
 * @param {RideService[]} rideService
 * @param {Ride[]} bookedRide
 * @returns {RidePrice[][]}
 */

export function getPriceForEachRide(
  routes: Routes[],
  rideService: RideService[],
  bookedRide: Ride[]
) {
  // iterate over all booked rides.
  // get the loc id, rideservice id.
  // find routes with loc id
  // calculate using lon and lat using Haversine function.
  // using rideserives id check the rideService being used
  // get the 'pricePerKm'
  //

  const bookedRideAndPrice: RidePrice[] = [];

  return bookedRide.map((bookedRide: Ride) => {
    const locationId = bookedRide.location_id;
    const rideSercviceId = bookedRide.rideservice_id;

    const route = routes.find(
      (route: Routes) => route.location_id === locationId
    ) as Routes;

    let {
      start_coord_lat,
      start_coord_long,
      destination_coord_lat,
      destination_coord_long,
    } = route;

    start_coord_lat = parseFloat(start_coord_lat as string);
    start_coord_long = parseFloat(start_coord_long as string);
    destination_coord_lat = parseFloat(destination_coord_lat as string);
    destination_coord_long = parseFloat(destination_coord_long as string);

    const distanceInKm = haversine_distance(
      start_coord_lat,
      start_coord_long,
      destination_coord_lat,
      destination_coord_long
    );

    const rideServiceBeingUsed = rideService.find(
      (service: RideService) => service.rideservice_id === rideSercviceId
    );
    const rideServiceRate = parseInt(
      rideServiceBeingUsed?.priceperkm as string
    );

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
