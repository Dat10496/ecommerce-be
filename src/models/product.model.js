"use strict";
const { Schema, model } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";
// Declare the Schema of the Mongo model

const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: { type: String },
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing", "Furniture"],
    },
    product_shop: { type: Schema.Types.ObjectId, ref: "Shop" },
    product_attributes: { type: Schema.Types.Mixed, required: true },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

const clothingSchema = new Schema({
  brand: { type: String, required: true },
  material: { type: String },
  size: { type: Number },
});

const electronicSchema = new Schema({
  manufacturer: { type: String, required: true },
  model: { type: String },
  color: { type: String },
});

const furnitureSchema = new Schema({
  brand: { type: String, required: true },
  material: { type: String },
  color: { type: String },
});

//Export the model
module.exports = {
  product: model(DOCUMENT_NAME, productSchema),
  electronic: model("Electronic", electronicSchema),
  clothing: model("Clothes", clothingSchema),
  furniture: model("Furniture", furnitureSchema),
};
