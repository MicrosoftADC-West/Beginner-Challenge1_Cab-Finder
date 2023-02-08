const Location = require("./models/locationModel");
const Ride = require("./models/rideModel");
const RideService = require("./models/rideServiceModel");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config();

const locations = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "..", "Data", "Data", "JSON", "locations.json")
  )
);
const rides = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "..", "Data", "Data", "JSON", "rides.json")
  )
);
const rideServices = JSON.parse(
  fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "..",
      "Data",
      "Data",
      "JSON",
      "rideservices.json"
    )
  )
);
mongoose.set("strictQuery", false);
async function importData() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("Error connecting to DB");
      console.log(err);
    });
  try {
    const promises = [];
    promises.push(Location.insertMany(locations));
    promises.push(Ride.insertMany(rides));
    promises.push(RideService.insertMany(rideServices));

    await Promise.all(promises);
    console.log("Data imported successfully");
  } catch (err) {
    console.log("Error importing data");
    console.log(err);
  }
}
async function deleteData() {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((err) => {
        console.log("Error connecting to DB");
        console.log(err);
      });

    const promises = [];
    promises.push(Location.deleteMany({}));
    promises.push(Ride.deleteMany({}));
    promises.push(RideService.deleteMany({}));

    await Promise.all(promises);
    console.log("Data deleted successfully");
  } catch (err) {
    console.log("Error deleting data");
    console.log(err);
  }
}

if (process.argv[2] === "--i") {
  importData();
} else if (process.argv[2] === "--d") {
  deleteData();
}

console.log(process.argv);
