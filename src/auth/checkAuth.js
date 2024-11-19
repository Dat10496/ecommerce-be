"use strict";

const { HEADER } = require("../constants");
const STATUS_CODES = require("http-response-status-code");
const { findById } = require("../services/apiKey.service");

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();

    if (!key) {
      return res.status(STATUS_CODES.FORBIDDEN).json({
        message: "Forbidden Error",
      });
    }

    // check ObjectKey
    const objKey = await findById(key);

    if (!objKey) {
      return res.status(STATUS_CODES.FORBIDDEN).json({
        message: "Forbidden Error",
      });
    }

    req.objKey = objKey;
    return next();
  } catch (error) {
    console.error(error);
  }
};

const permissions = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(STATUS_CODES.FORBIDDEN).json({
        message: "Forbidden Error",
      });
    }

    if (!req.objKey.permissions.includes(permission)) {
      return res.status(STATUS_CODES.FORBIDDEN).json({
        message: "Forbidden Error",
      });
    }

    return next();
  };
};

module.exports = { apiKey, permissions };
