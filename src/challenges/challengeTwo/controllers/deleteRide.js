const { Ride } = require('../models');

const deleteRide = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [ride] = await Ride.findById(id);
    if (ride.length == 0) {
      return res.status(404).send({
        error: 'Ride not found',
      });
    }

    await Ride.findByIdandDelete(id);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = deleteRide;
