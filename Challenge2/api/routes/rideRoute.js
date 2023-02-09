const express = require("express");

// controllers
const {
  getRides,
  getSingleRide,
  addRide,
  updateRide,
  deleteRide
} = require("../controllers/rideController");

const router = express.Router();

router.get("/", getRides);
router.get("/:id", getSingleRide);
router.post("/", addRide);
router.put("/:id", updateRide);
router.delete("/:id", deleteRide);

module.exports = router;
