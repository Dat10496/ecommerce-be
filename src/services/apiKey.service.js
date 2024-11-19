"use strict";

const crypto = require("crypto");
const apikeyModel = require("../models/apikey.model");

const findById = async (key) => {
  const objKey = await apikeyModel.findOne({ key, status: true }).lean();

  return objKey;
};

const createKeyPair = () => {
  const privateKey = crypto.randomBytes(64).toString("hex");
  const publicKey = crypto.randomBytes(64).toString("hex");

  return { privateKey, publicKey };
};

module.exports = { findById, createKeyPair };
