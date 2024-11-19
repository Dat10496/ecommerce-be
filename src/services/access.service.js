"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");

const keyTokenService = require("./keyToken.service");
const { createTokenPair, verifyJWT } = require("../auth/utilsAuth");
const { ROLE_SHOP } = require("../constants");
const { getInfoData } = require("../utils");
const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { findByEmail } = require("./shop.services");
const { createKeyPair } = require("./apiKey.service");
const { verify } = require("crypto");

class AccessService {
  /* signin */
  static signIn = async ({ email, password }) => {
    // check email in dbs
    const shop = await findByEmail({ email });
    if (!shop) throw new BadRequestError("Shop not registered");

    // check password
    const match = await bcrypt.compare(password, shop.password);
    if (!match) throw new AuthFailureError("Incorrect password");

    // create pairKey
    const { privateKey, publicKey } = createKeyPair();

    // create tokens
    const tokens = await createTokenPair(
      { id: shop._id, email },
      publicKey,
      privateKey
    );

    // save key tokens to DB
    await keyTokenService.createKeyToken({
      userId: shop._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      code: 201,
      metadata: {
        shop: getInfoData({
          object: shop,
          fields: ["_id", "email", "password"],
        }),
        tokens,
      },
    };
  };

  // signout
  static signOut = async (keyStore) => {
    const delKey = await keyTokenService.removeKeyById(keyStore._id);
  };

  // signup
  static signUp = async ({ name, email, password }) => {
    // check existing email
    const holderSop = await findByEmail({ email });

    if (holderSop) {
      throw new BadRequestError("Shop already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      role: [ROLE_SHOP.SHOP],
    });

    if (newShop) {
      //create privateKey publicKey
      const { privateKey, publicKey } = createPairKey();

      const tokens = await createTokenPair(
        { id: newShop._id, email },
        publicKey,
        privateKey
      );
      console.log("tokens::", tokens);
      // save publicKey to DB
      const keyStore = await keyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
        refreshToken: tokens.refreshToken,
      });

      // if (!keyStore) {
      //   throw new BadRequestError("Error: Save keyStore to DB Error");
      // }

      if (!tokens) throw new BadRequestError("Error");

      return {
        code: 201,
        metadata: {
          shop: getInfoData({
            object: newShop,
            fields: ["_id", "email", "password"],
          }),
          tokens,
        },
      };
    }
    return {
      code: 201,
      metadata: null,
    };
  };

  // handle refresh token
  static handleRefreshToken = async ({ refreshToken, user, keyStore }) => {
    //check if token used?
    const foundToken = await keyTokenService.findByRefreshTokenUsed(
      refreshToken
    );

    // if used delete it
    if (foundToken) {
      const { userId, email } = await verifyJWT(
        refreshToken,
        foundToken.privateKey
      );

      await keyTokenService.deleteKeyById(userId);
      throw new ForbiddenError("something wrong happen! login again please");
    }
  };
}

module.exports = AccessService;
