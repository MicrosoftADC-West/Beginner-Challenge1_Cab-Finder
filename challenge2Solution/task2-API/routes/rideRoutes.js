const express = require("express");
const rideController = require("../controllers/rideController");

const router = express.Router();

router
  .route("/")
  .get(rideController.getAllRides)
  .post(rideController.createRide);

router
  .route("/:id")
  .get(rideController.getRide)
  .put(rideController.updateRide)
  .delete(rideController.deleteRide);

module.exports = router;
