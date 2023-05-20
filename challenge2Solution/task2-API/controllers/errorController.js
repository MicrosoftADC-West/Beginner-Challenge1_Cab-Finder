const AppError = require("../utils/AppError");

const handleCastErrorDB = (err, res) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 404);
};
const handleDuplicateFieldsError = (err) => {
  const message = `${err.keyValue.name} already exists in database, please use another value`;
  return new AppError(message, 400);
};
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const message = `Invalid input data: ${errors.join("; ")}`;
  return new AppError(message, 401);
};
const handleJsonWebTokenError = (err) => {
  const message = `${err.name}; ${err.message}`;
  return new AppError(message, 401);
};
const handleExpiredJWTError = (err) => {
  const message = `${err.message}! Please login again`;
  return new AppError(message, 401);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // OPERATIONAL ERROR, trusted so send appropriate message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // PROGRAMMING OR UNKNOWN ERROR, so don't leak error details to the client
  } else {
    //   1) log error to the console
    // eslint-disable-next-line no-console
    console.error("ERROR", err);

    //   2) send a generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsError(err);
    if (err.name === "ValidationError") {
      error = handleValidationError(err);
    }
    if (err.name === "JsonWebTokenError") {
      error = handleJsonWebTokenError(err);
    }
    if (err.name === "TokenExpiredError") {
      error = handleExpiredJWTError(err);
    }
    sendErrorProd(error, res);
  }
};
