import express from "express";
import {
  getAllLocations,
  getAllRides,
  getAllRideServices,
  createNewLocation,
} from "../controllers/utilControllers";

const router = express.Router();
router.get("/rideservices", getAllRideServices);
router.get("/allrides", getAllRides);
router.get("/locations", getAllLocations);
router.post("/locations", createNewLocation);

export default router;
