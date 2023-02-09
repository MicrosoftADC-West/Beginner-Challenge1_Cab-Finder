const { Ride } = require('../models');

const getAllRide = async (req, res, next) => {
  try {
    const {
      start_coord_long,
      start_coord_lat,
      destination_coord_long,
      destination_coord_lat,
    } = req.query;

    const [allRides] = await Ride.findAll();
    let filteredRides = [];
    if (Object.keys(req.query).length > 0) {
      filteredRides = allRides.filter(
        (ride) =>
          start_coord_lat >= ride.start_coord_lat &&
          start_coord_long >= start_coord_long &&
          destination_coord_lat <= ride.destination_coord_lat &&
          destination_coord_long <= ride.destination_coord_long
      );
    } else {
      filteredRides = allRides;
    }

    return res.status(200).send({
      data: filteredRides,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = getAllRide;
