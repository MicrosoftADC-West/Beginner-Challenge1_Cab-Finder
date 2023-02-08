const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    location_id: {
      type: Number,
      required: [true, "location must have a location_id"],
      unique: true,
    },
    location_description: {
      type: String,
      required: [true, "location must have a location_description"],
    },
    start_coord_long: {
      type: Number,
      required: [true, "location must have a start_coord_long"],
    },
    start_coord_lat: {
      type: Number,
      required: [true, "location must have a start_coord_lat"],
    },
    destination_coord_long: {
      type: Number,
      required: [true, "location must have a destination_coord_long"],
    },
    destination_coord_lat: {
      type: Number,
      required: [true, "location must have a destination_coord_lat"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
