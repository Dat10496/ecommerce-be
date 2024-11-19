"use strict";
const STATUS_CODES = require("http-response-status-code");

class ResponseSuccess {
  constructor({
    message,
    statusCode = STATUS_CODES.OK,
    reasonStatusCode = STATUS_CODES.getStatusDescription(STATUS_CODES.OK),
    metadata = {},
  }) {
    this.message = message ? message : reasonStatusCode;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.statusCode).json(this);
  }
}

class OK extends ResponseSuccess {
  constructor({ message, metadata }) {
    super(message, metadata);
  }
}

class CREATED extends ResponseSuccess {
  constructor({
    message,
    statusCode = STATUS_CODES.CREATED,
    reasonStatusCode = STATUS_CODES.getStatusDescription(STATUS_CODES.CREATED),
    metadata,
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
  }
}

module.exports = { OK, CREATED, ResponseSuccess };
