const statusCodes = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  UNPROCESSED_ENTITY: 442
};

exports.statusCodes = statusCodes;

const SERVER_ERROR_MESSAGE = "Ooops! Something went wrong, kindly try again";

exports.SERVER_ERROR_MESSAGE = SERVER_ERROR_MESSAGE;

exports.successResponse = (res, statusCode = statusCodes.SUCCESS, message, data) =>
  res.status(statusCode).json({
    success: true,
    message,
    data
  });

exports.failureResponse = (res, statusCode = statusCodes.BAD_REQUEST, message) =>
  res.status(statusCode).json({
    success: false,
    message
  });

exports.serverFailure = (
  res,
  statusCode = statusCodes.SERVER_ERROR,
  message = SERVER_ERROR_MESSAGE
) => {
  res.status(statusCode).json({
    success: false,
    message
  });
};
