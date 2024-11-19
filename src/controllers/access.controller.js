"use strict";
const STATUS_CODES = require("http-response-status-code");
const AccessService = require("../services/access.service");
const { CREATED, ResponseSuccess } = require("../core/success.response");

class AccessController {
  handleRefreshToken = async (req, res, next) => {
    new ResponseSuccess({
      message: "User refreshed successfully",
      metadata: await AccessService.handleRefreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  };

  signIn = async (req, res, next) => {
    new ResponseSuccess({
      message: "User signed in successfully",
      metadata: await AccessService.signIn(req.body),
    }).send(res);
  };

  signUp = async (req, res, next) => {
    new CREATED({
      message: "User created successfully",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };

  signOut = async (req, res, next) => {
    new ResponseSuccess({
      message: "User signed out successfully",
      metadata: await AccessService.signOut(req.keyStore),
    }).send(res);
  };
}

module.exports = new AccessController();
