const express = require("express");
const cors = require("cors");
const { failureResponse, statusCodes, successResponse } = require("./utils/api-response");

// config dotenv
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;

// body parser
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

// routes
// Load routers
const rideRouter = require("./routes/rideRoute");

// Use routers
app.use("/rides", rideRouter);
app.use("/", (req, res) => {
  successResponse(
    res,
    statusCodes.SUCCESS,
    "Skill Challenge-Cab-Finder API. Server is up and running"
  );
});

// handle other requests
app.use("*", (req, res) => failureResponse(res, statusCodes.NOT_FOUND, "route not found"));

app.listen(PORT, console.log(`app running on port ${PORT}`));
