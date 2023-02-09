const db = require("../config/db");
const { getDistanceFromLatLonInKm } = require("../helpers/calculateDistance");

const {
  successResponse,
  failureResponse,
  statusCodes,
  serverFailure
} = require("../utils/api-response");

exports.getRides = async (req, res) => {
  const { start_location, end_location } = req.query;
  try {
    if (!start_location || !end_location) {
      return failureResponse(
        res,
        statusCodes.BAD_REQUEST,
        "The required query parameters are not provided."
      );
    }

    // extract the cordinate from the query
    const start_coord_long = start_location.split(",")[0].trim();
    const start_coord_lat = start_location.split(",")[1].trim();

    const destination_coord_long = end_location.split(",")[0].trim();
    const destination_coord_lat = end_location.split(",")[1].trim();

    // get the route that owns the cordinate
    const route = await db("locations").select().where({
      start_coord_long: start_coord_long,
      start_coord_lat: start_coord_lat,
      destination_coord_long: destination_coord_long,
      destination_coord_lat: destination_coord_lat
    });

    if (!route[0]) {
      return failureResponse(
        res,
        statusCodes.BAD_REQUEST,
        "A route with this cordinates does not exist."
      );
    }

    // calculate the route distance
    const routeDistance = getDistanceFromLatLonInKm(
      route[0].start_coord_lat,
      route[0].start_coord_long,
      route[0].destination_coord_lat,
      route[0].destination_coord_long
    );

    // get all rides(join rideservice) with the location_id of this route
    const rides = await db("ride")
      .join("rideservice", "ride.rideservice_id", "=", "rideservice.rideservice_id")
      .select()
      .where("location_id", route[0].location_id);

    // calculate the price of each ride

    const detailedRides = rides.map(ride => {
      // calculate price for this ride
      const ridePrice = ride.priceperkm * routeDistance;

      return {
        ...ride,
        price: ridePrice
      };
    });

    return successResponse(res, statusCodes.SUCCESS, `Rides fetched succesfully`, {
      rides: detailedRides
    });
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.getSingleRide = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "Ride id not provided.");
    }

    // get ride(join locations and rideservice) with the ride id of this id
    const ride = await db("ride")
      .join("locations", "ride.location_id", "=", "locations.location_id")
      .join("rideservice", "ride.rideservice_id", "=", "rideservice.rideservice_id")
      .select()
      .where("ride_id", id);

    if (!ride.length) {
      return failureResponse(res, statusCodes.NOT_FOUND, "A ride with this id does not exist.");
    }

    // calculate the route distance
    const routeDistance = getDistanceFromLatLonInKm(
      ride[0].start_coord_lat,
      ride[0].start_coord_long,
      ride[0].destination_coord_lat,
      ride[0].destination_coord_long
    );

    // calculate and attach price
    const detailedRide = {
      ...ride[0],
      price: ride[0].priceperkm * routeDistance
    };

    return successResponse(res, statusCodes.SUCCESS, `Ride fetched succesfully`, {
      ride: detailedRide
    });
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.addRide = async (req, res) => {
  const { start_location, end_location, ride_service, estimated_arrival_time } = req.body;
  try {
    // check required fields
    if (!start_location || !end_location || !ride_service || !estimated_arrival_time) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "Please provide all required fields.");
    }

    // check date format
    if (isNaN(Date.parse(new Date(estimated_arrival_time)))) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "Please provide a correct date format.");
    }

    // get ride service
    const rideservice = await db("rideservice").select().where("rideservice_name", ride_service);

    if (!rideservice.length) {
      return failureResponse(
        res,
        statusCodes.BAD_REQUEST,
        `${ride_service} is not an existing ride service`
      );
    }

    const start_coord_long = start_location.split(",")[0].trim();
    const start_coord_lat = start_location.split(",")[1].trim();

    const destination_coord_long = end_location.split(",")[0].trim();
    const destination_coord_lat = end_location.split(",")[1].trim();

    // get the route that owns the cordinate
    const route = await db("locations").select().where({
      start_coord_long: start_coord_long,
      start_coord_lat: start_coord_lat,
      destination_coord_long: destination_coord_long,
      destination_coord_lat: destination_coord_lat
    });

    if (!route[0]) {
      return failureResponse(
        res,
        statusCodes.BAD_REQUEST,
        "A route with this cordinates does not exist."
      );
    }

    // add ride
    const createdRideId = await db("ride")
      .insert({
        location_id: route[0].location_id,
        rideservice_id: rideservice[0].rideservice_id,
        estimated_arrival_time
      })
      .returning("ride_id");

    return successResponse(res, statusCodes.CREATED, `Ride added succesfully`, {
      rideId: createdRideId[0].ride_id
    });
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.updateRide = async (req, res) => {
  const { id } = req.params;
  const { start_location, end_location, ride_service, estimated_arrival_time } = req.body;
  try {
    if (!id) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "Ride id not provided.");
    }

    // get ride with the ride id of this id
    const ride = await db("ride").select().where("ride_id", id);

    if (!ride.length) {
      return failureResponse(res, statusCodes.NOT_FOUND, "A ride with this id does not exist.");
    }

    // check required fields
    if (!start_location || !end_location || !ride_service || !estimated_arrival_time) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "Please provide all required fields.");
    }

    // check date format
    if (isNaN(Date.parse(new Date(estimated_arrival_time)))) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "Please provide a correct date format.");
    }

    // get ride service
    const rideservice = await db("rideservice").select().where("rideservice_name", ride_service);

    if (!rideservice.length) {
      return failureResponse(
        res,
        statusCodes.BAD_REQUEST,
        `${ride_service} is not an existing ride service`
      );
    }

    const start_coord_long = start_location.split(",")[0].trim();
    const start_coord_lat = start_location.split(",")[1].trim();

    const destination_coord_long = end_location.split(",")[0].trim();
    const destination_coord_lat = end_location.split(",")[1].trim();

    // get the route that owns the cordinate
    const route = await db("locations").select().where({
      start_coord_long: start_coord_long,
      start_coord_lat: start_coord_lat,
      destination_coord_long: destination_coord_long,
      destination_coord_lat: destination_coord_lat
    });

    if (!route[0]) {
      return failureResponse(
        res,
        statusCodes.BAD_REQUEST,
        "A route with this cordinates does not exist."
      );
    }

    // update ride
    const updatedRide = await db("ride")
      .update({
        location_id: route[0].location_id,
        rideservice_id: rideservice[0].rideservice_id,
        estimated_arrival_time
      })
      .where("ride_id", ride[0].ride_id)
      .returning("*");

    return successResponse(res, statusCodes.SUCCESS, `Ride updated succesfully`, {
      updatedRide: updatedRide[0]
    });
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};

exports.deleteRide = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return failureResponse(res, statusCodes.BAD_REQUEST, "Ride id not provided.");
    }

    // get ride with the ride id of this id
    const ride = await db("ride").select().where("ride_id", id);

    if (!ride.length) {
      return failureResponse(res, statusCodes.NOT_FOUND, "A ride with this id does not exist.");
    }

    // delte ride
    await db("ride").delete().where("ride_id", ride[0].ride_id);

    return successResponse(res, statusCodes.NO_CONTENT, `Ride deleted succesfully`, {});
  } catch (error) {
    console.log({ error });
    return serverFailure(res);
  }
};
