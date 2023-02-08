const mongoose = require("mongoose");

const rideServiceSchema = new mongoose.Schema(
  {
    rideservice_id: {
      type: Number,
      required: [true, "rideService must have a rideservice_id"],
      unique: true,
    },
    rideservice_name: {
      type: String,
      required: [true, "rideService must have a rideservice_name"],
    },
    priceperkm: {
      type: Number,
      required: [true, "rideService must have a priceperkm"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const RideService = mongoose.model("RideService", rideServiceSchema);

module.exports = RideService;
