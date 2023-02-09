import express from "express";
import {
  createRide,
  deleteRide,
  getRideById,
  getRides,
  putRide,
} from "../controllers/rideControllers";

const router = express.Router();
router.get("/", getRides);
router.get("/:id", getRideById);
router.post("/", createRide);
router.put("/:id", putRide);
router.delete("/:id", deleteRide);

export default router;
