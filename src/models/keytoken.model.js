"use strict";

const { Schema, model } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "KeyToken";
const COLLECTION_NAME = "KeyTokens";
// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    refreshTokensUsed: {
      type: Array,
      default: [],
    }, // RT used
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);