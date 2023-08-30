const { Ride } = require('../models');

const updateRide = async (req, res, next) => {
  try {
    const { id } = params;
    const {
      start_coord_long,
      start_coord_lat,
      destination_coord_long,
      destination_coord_lat,
      rideservice,
      estimated_arrival_time,
    } = req.body;
    stmts = [];
    values = [];

    const [ride] = await Ride.findById(id);
    if (ride.length == 0) {
      return res.status(404).send({
        error: 'Ride not found',
      });
    }

    if (
      start_coord_lat ||
      start_coord_long ||
      destination_coord_lat ||
      destination_coord_long
    ) {
      const [location] = await Location.findByCoord({
        start_coord_lat,
        start_coord_long,
        destination_coord_lat,
        destination_coord_long,
      });
      if (location.length == 0) {
        return res.status(404).send({ error: 'location not found' });
      }
      stmts.push('location_id = ?');
      values.push(location[0].location_id);
    }

    if (rideservice) {
      const [rideServ] = await RideService.findByName(
        rideservice.toUpperCase()
      );
      if (rideServ.length == 0) {
        return res.status(404).send({ error: 'ride service not found' });
      }
      stmts.push('rideservice_id = ?');
      values.push(rideServ[0].rideservice_id);
    }

    if (estimated_arrival_time) {
      stmts.push('estimated_arrival_time = ?');
      values.push(estimated_arrival_time);
    }

    await Ride.findByIdAndUpdate(id, stmts, values);

    const [updatedRide] = await Ride.findById(id);

    return res.status(200).send({
      message: 'ride updated successfully',
      data: updatedRide,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = updateRide;
