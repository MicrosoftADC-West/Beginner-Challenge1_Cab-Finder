const { Ride } = require('../models');
const getDistanceFromLatLonInKm = require('../../../helpers/distanceFromLatLon');

const getRide = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [ride] = await Ride.findById(id);
    if (ride.length === 0) {
      return res.status(404).send({
        error: 'Ride not found',
      });
    }
    const extractedRide = ride[0];
    const {
      start_coord_long: lat1,
      start_coord_lat: lon1,
      destination_coord_long: lon2,
      destination_coord_lat: lat2,
      priceperkm,
    } = extractedRide;

    const price =
      priceperkm * getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    console.log(price);
    return res.status(200).send({
      message: 'ride fetched successfully',
      data: {
        ...extractedRide,
        price,
      },
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getRide;
