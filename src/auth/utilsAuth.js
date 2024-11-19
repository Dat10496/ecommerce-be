"use strict";
const JWT = require("jsonwebtoken");
const { asyncHandle } = require("../helpers/asyncHandler");
const { HEADER } = require("../constants");
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const { findByUserId } = require("../services/keyToken.service");

const createTokenPair = async (payload, publicKey, privateKey) => {
  // create accessToken
  const accessToken = await JWT.sign(payload, publicKey, {
    expiresIn: "2 days",
  });

  //create refreshToken
  const refreshToken = await JWT.sign(payload, privateKey, {
    expiresIn: "7 days",
  });

  JWT.verify(accessToken, publicKey, (err, decode) => {
    if (err) {
      console.log(`verify token error::`, err);
    } else {
      console.log("verify token success::", decode);
    }
  });

  return { accessToken, refreshToken };
};

const authentication = asyncHandle(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid Request");

  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not found keyStore");

  if (request.headers[HEADER.REFRESHTOKEN]) {
    try {
      const refreshToken = req.headers[HEADER.REFRESHTOKEN];
      const decodeUser = await JWT.verify(refreshToken, keyStore.privateKey);

      if (userId !== decodeUser.id) {
        throw new AuthFailureError("Invalid userId");
      }
      req.keyStore = keyStore;
      req.user = decodeUser;
      req.refreshToken = refreshToken;

      next();
    } catch (error) {
      throw error;
    }
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError("Invalid Request");

  try {
    const decodeUser = await JWT.verify(accessToken, keyStore.publicKey);

    if (userId !== decodeUser.id) {
      throw new AuthFailureError("Invalid userId");
    }
    req.keyStore = keyStore;
    next();
  } catch (error) {
    throw error;
  }
});

const verifyJWT = async (token, keySecret) => {
  return await JWT.verify(token, keySecret);
};

module.exports = {
  createTokenPair,
  authentication,
  verifyJWT,
};
