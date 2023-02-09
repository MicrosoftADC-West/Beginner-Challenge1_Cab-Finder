import express from "express";
import {
  getAllLocations,
  getAllRides,
  getAllRideServices,
  createNewLocation,
  createNewRideService,
} from "../controllers/utilControllers";

const router = express.Router();
router.get("/rideservices", getAllRideServices);
router.post("/rideservices", createNewRideService);

router.get("/allrides", getAllRides);
router.get("/locations", getAllLocations);
router.post("/locations", createNewLocation);

export default router;
