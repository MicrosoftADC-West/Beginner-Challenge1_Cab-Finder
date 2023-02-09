const { Ride, Location, RideService } = require('../models');

const addRide = async (req, res, next) => {
  try {
    const {
      start_coord_long,
      start_coord_lat,
      destination_coord_long,
      destination_coord_lat,
      rideservice,
      estimated_arrival_time,
    } = req.body;

    const [location] = await Location.findByCoord({
      start_coord_lat,
      start_coord_long,
      destination_coord_lat,
      destination_coord_long,
    });
    if (location.length == 0) {
      return res.status(404).send({ error: 'location not found' });
    }

    const [rideServ] = await RideService.findByName(rideservice.toUpperCase());
    if (rideServ.length == 0) {
      return res.status(404).send({ error: 'ride service not found' });
    }

    const createdRide = await Ride.create({
      location_id: location[0].location_id,
      rideservice_id: rideServ[0].rideservice_id,
      estimated_arrival_time,
    });

    return res.status(200).send({
      message: 'ride booked successfully',
      data: createdRide,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = addRide;
