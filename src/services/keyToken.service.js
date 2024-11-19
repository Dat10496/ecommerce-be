"use strict";

const { Types } = require("mongoose");

const {
  Types: { ObjectId },
} = require("mongoose");

const keyTokenModel = require("../models/keyToken.model");

class keyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      const filter = { user: userId };
      const update = {
        publicKey,
        privateKey,
        refreshTokensUsed: [],
        refreshToken,
      };
      const options = { new: true, upsert: true };

      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.error("Error creating key token:", error);
      return error;
    }
  };

  static findByUserId = async (userId) => {
    const keyToken = await keyTokenModel
      .findOne({
        user: new ObjectId(userId),
      })
      .lean();

    return keyToken;
  };

  static removeKeyById = async (id) => {
    const options = { new: true };
    return await keyTokenModel.findByIdAndDelete(id, options);
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken });
  };

  static deleteKeyById = async (userId) => {
    return await keyTokenModel.findByIdAndDelete({ user: userId });
  };
}

module.exports = keyTokenService;
