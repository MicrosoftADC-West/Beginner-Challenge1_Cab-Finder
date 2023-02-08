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
      required: [true, "ride must have a location_id"],
    },
    rideservice_id: {
      type: Number,
      required: [true, "ride must have a rideservice_id"],
    },
    estimated_arrival_time: {
      type: Date,
      required: [true, "ride must have a estimated_arrival_time"],
    },
    price: {
      type: Number,
      ref: "RideService",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
rideSchema.pre(/^find/, function (next) {
  this.populate({
    path: "rideservice_id",
    select: "price",
  });
  next();
});
const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
