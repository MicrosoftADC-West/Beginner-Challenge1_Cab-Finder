const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Ride = require("../models/rideModel");
const Location = require("../models/locationModel");
const RideService = require("../models/rideServiceModel");
const ReShape = require("../utils/riderHelperMethods");

exports.getAllRides = catchAsync(async (req, res, next) => {
  let rides;
  const { start_location, end_location } = req.query;

  if (start_location && end_location) {
    const startLocationArray = start_location.split(",");
    const endLocationArray = end_location.split(",");

    if (startLocationArray.length !== 2 || endLocationArray.length !== 2) {
      return next(new AppError("Please provide a valid location", 400));
    }
    const location = await Location.findOne({
      $and: [
        { start_coord_lat: Number(startLocationArray[0]) },
        { start_coord_long: Number(startLocationArray[1]) },
        { destination_coord_lat: Number(endLocationArray[0]) },
        { destination_coord_long: Number(endLocationArray[1]) },
      ],
    });

    if (!location || location.length === 0) {
      return next(new AppError("Please provide a valid location", 400));
    }
    const ridesBefore = await Ride.find({
      location_id: location.location_id,
    })
      .populate("service")
      .populate("location");

    rides = new ReShape(ridesBefore).refactorRides();
  } else {
    const ridesBefore = await Ride.find()
      .populate("service")
      .populate("location");
    rides = new ReShape(ridesBefore).refactorRides();
  }

  res.status(200).json({
    status: "success",
    results: rides.length,
    data: {
      rides,
    },
  });
});

exports.getRide = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const ride = await Ride.findOne({ ride_id: id })
    .populate("service")
    .populate("location");

  if (!ride) {
    return next(new AppError("No ride found with that ID", 404));
  }

  const newRide = new ReShape([ride]).refactorRides();

  res.status(200).json({
    status: "success",
    data: {
      ride: newRide[0],
    },
  });
});

exports.createRide = catchAsync(async (req, res, next) => {
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

exports.updateRide = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { start_location, end_location, ride_service, estimated_arrival_time } =
    req.body;

  let location;
  let rideService;
  let estimatedTime;
  if (start_location && end_location) {
    if (start_location.length !== 2 || end_location.length !== 2) {
      return next(new AppError("Please provide a valid location", 400));
    }

    const loc = await Location.findOne({
      $and: [
        { start_coord_lat: Number(start_location[0]) },
        { start_coord_long: Number(start_location[1]) },
        { destination_coord_lat: Number(end_location[0]) },
        { destination_coord_long: Number(end_location[1]) },
      ],
    });
    if (!loc) {
      return next(new AppError("Please provide a valid location", 400));
    } else {
      location = loc;
    }
  }
  if (ride_service) {
    rideService = await RideService.findOne({ rideservice_name: ride_service });
  }

  if (estimated_arrival_time) {
    if (!estimated_arrival_time instanceof Date) {
      return next(new AppError("Please provide a valid date", 400));
    } else {
      estimatedTime = estimated_arrival_time;
    }
  }
  const updateBody = {};
  if (location) updateBody.location_id = location.location_id;
  if (rideService) updateBody.rideservice_id = rideService.rideservice_id;
  if (estimatedTime) updateBody.estimated_arrival_time = location.estimatedTime;

  const updatedRide = await Ride.findOneAndUpdate({ ride_id: id }, updateBody, {
    runValidators: true,
    new: true,
  });

  if (!updatedRide) {
    return next(new AppError("No ride found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      updatedRide,
    },
  });
});

exports.deleteRide = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedRide = await Ride.findOneAndDelete({ ride_id: id });

  if (!deletedRide) {
    return next(new AppError("No ride found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
