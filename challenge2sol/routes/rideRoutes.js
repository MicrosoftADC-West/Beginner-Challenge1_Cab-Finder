const express = require("express");
const rideController = require("../controllers/rideController");

const router = express.Router();

router
  .route("/")
  .get(rideController.getAllRides)
  .post(rideController.createRide);

router
  .route("/rides/:id")
  .get((req, res) => {})
  .put()
  .delete();

module.exports = router;
