const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Ride = require("../models/rideModel");
const Location = require("../models/locationModel");
const RideService = require("../models/rideServiceModel");

exports.getAllRides = catchAsync(async (req, res, next) => {
  let rides;
  const { start_location, end_location } = req.query;
  if (start_location && end_location) {
    const location = await Location.find({
      start_coord_lat: Number(start_location[0]),
      start_coord_long: Number(start_location[1]),
      destination_coord_lat: Number(end_location[0]),
      destination_coord_long: Number(end_location[1]),
    });
    if (!location) {
      return next(new AppError("Please provide a valid location", 400));
    }
    rides = await Ride.find({ location_id: location[0].location_id });
  } else {
    rides = await Ride.find();
  }

  res.status(200).json({
    status: "success",
    data: {
      rides,
    },
  });
});

exports.createRide = catchAsync(async (req, res, next) => {
  //     start_location (required): The starting location for the ride.
  // end_location (required): The destination location for the ride.
  // ride_service (required): The ride service (e.g., Uber, Lyft, Taxi) for the ride.
  // estimated_arrival_time (required): The estimated arrival time for the ride.

  const { start_location, end_location, ride_service, estimated_arrival_time } =
    req.body;
  if (
    !start_location ||
    !end_location ||
    !ride_service ||
    !estimated_arrival_time
  ) {
    return next(new AppError("Please provide all required fields", 400));
  }
  if (!Array.isArray(end_location) || !Array.isArray(start_location)) {
    return next(new AppError("Please provide a valid location", 400));
  }

  if (
    end_location.length !== 2 ||
    start_location.length !== 2 ||
    typeof Number(end_location[0]) !== "number" ||
    typeof Number(end_location[1]) !== "number" ||
    typeof Number(start_location[0]) !== "number" ||
    typeof Number(start_location[1]) !== "number"
  ) {
    return next(new AppError("Please provide a valid location", 400));
  }

  if (estimated_arrival_time instanceof Date) {
    return next(new AppError("Please provide a valid date", 400));
  }

  // "start_coord_long": 3.548056,
  // "start_coord_lat": 6.462222,
  // "destination_coord_long": 3.360833,
  // "destination_coord_lat": 6.520833

  const location = await Location.find({
    start_coord_lat: Number(start_location[0]),
    start_coord_long: Number(start_location[1]),
    destination_coord_lat: Number(end_location[0]),
    destination_coord_long: Number(end_location[1]),
  });
  if (!location) {
    return next(new AppError("Please provide a valid location", 400));
  }

  const rideService = await RideService.find({
    rideservice_name: ride_service,
  });

  if (!rideService) {
    return next(new AppError("Please provide a valid ride service", 400));
  }
  const lastRideCreated = await Ride.find().sort({ ride_id: -1 }).limit(1);

  let nextRideId;

  if (!lastRideCreated[0]) {
    nextRideId = 1;
  } else {
    nextRideId = lastRideCreated[0].ride_id + 1;
  }

  console.log(
    nextRideId,
    location[0].location_id,
    rideService[0].rideservice_id,
    estimated_arrival_time
  );
  //   console.log(location, rideService);
  const rideToBeCreated = {
    ride_id: nextRideId,
    location_id: location[0].location_id,
    rideservice_id: rideService[0].rideservice_id,
    estimated_arrival_time,
  };

  const ride = await Ride.create(rideToBeCreated);
  res.status(201).json({
    status: "success",
    data: {
      ride,
    },
  });
});
