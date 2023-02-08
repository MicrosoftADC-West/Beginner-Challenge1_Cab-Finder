const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rideRouter = require("./routes/rideRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/rides", rideRouter);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to the Ride API",
    link_to_postman_documentation: "",
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
