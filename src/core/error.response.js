"use strict";
const STATUS_CODES = require("http-response-status-code");

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// handle conflict request
class ConflictRequestError extends ErrorResponse {
  constructor(
    message = STATUS_CODES.getStatusDescription(STATUS_CODES.CONFLICT),
    status = STATUS_CODES.CONFLICT
  ) {
    super(message, status);
  }
}

// handle bad request
class BadRequestError extends ErrorResponse {
  constructor(
    message = STATUS_CODES.getStatusDescription(STATUS_CODES.BAD_REQUEST),
    status = STATUS_CODES.BAD_REQUEST
  ) {
    super(message, status);
  }
}

// Unauthorized request
class AuthFailureError extends ErrorResponse {
  constructor(
    message = STATUS_CODES.getStatusDescription(STATUS_CODES.UNAUTHORIZED),
    status = STATUS_CODES.UNAUTHORIZED
  ) {
    super(message, status);
  }
}

//Not found error request
class NotFoundError extends ErrorResponse {
  constructor(
    message = STATUS_CODES.getStatusDescription(STATUS_CODES.NOT_FOUND),
    status = STATUS_CODES.NOT_FOUND
  ) {
    super(message, status);
  }
}

//Forbidder request
class ForbiddenError extends ErrorResponse {
  constructor(
    message = STATUS_CODES.getStatusDescription(STATUS_CODES.FORBIDDEN),
    status = STATUS_CODES.FORBIDDEN
  ) {
    super(message, status);
  }
}

module.exports = {
  ErrorResponse,
  ConflictRequestError,
  BadRequestError,
  NotFoundError,
  AuthFailureError,
  ForbiddenError,
};
