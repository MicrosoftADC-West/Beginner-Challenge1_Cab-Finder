const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    ride_id: {
      type: Number,
      required: [true, "ride must have a ride_id"],
      unique: true,
    },
    location_id: {
      type: Number,
      ref: "Location",
      required: [true, "ride must have a location_id"],
    },
    rideservice_id: {
      type: Number,
      ref: "RideService",
      required: [true, "ride must have a rideservice_id"],
    },
    estimated_arrival_time: {
      type: Date,
      required: [true, "ride must have a estimated_arrival_time"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

rideSchema.virtual("service", {
  ref: "RideService",
  foreignField: "rideservice_id",
  localField: "rideservice_id",
});
rideSchema.virtual("location", {
  ref: "Location",
  foreignField: "location_id",
  localField: "location_id",
});

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
