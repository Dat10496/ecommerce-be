"use strict";

const { BadRequestError } = require("../core/error.response");
const productModel = require("../models/product.model.js");
const {
  product,
  clothing,
  furniture,
  electronic,
} = require("../models/product.model.js");

// define factory to create products
class ProductFactory {
  static createProduct = async (type, payload) => {
    switch (type) {
      case "clothing":
        return new Clothing(payload).createProduct();
      case "furniture":
        return new Furniture(payload).createProduct();
      case "electronic":
        return new Electronic(payload).createProduct();
      default:
        throw new BadRequestError(`Invalid product type:: ${type}`);
    }
  };
}

// define base product class
class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }

  // cerate new product
  async createProduct() {
    return await product.create(this);
  }
}

// define sub-class for different product type Clothing
class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create(this.product_attributes);
    if (!newClothing) throw new BadRequestError("create Clothing error");

    const newProduct = await super.createProduct();
    if (!newProduct) throw new BadRequestError("create Product error");

    return newProduct;
  }
}

// define sub-class for different product type Furniture
class Furniture extends Product {
  async createProduct() {
    const newFurniture = await clothing.create(this.product_attributes);
    if (!newFurniture) throw new BadRequestError("create Furniture error");

    const newProduct = await super.createProduct();
    if (!newProduct) throw new BadRequestError("create Product error");

    return newProduct;
  }
}

// define sub-class for different product type Electronic
class Electronic extends Product {
  async createProduct() {
    const newElectronic = await clothing.create(this.product_attributes);
    if (!newElectronic) throw new BadRequestError("create Electronic error");

    const newProduct = await super.createProduct();
    if (!newProduct) throw new BadRequestError("create Product error");

    return newProduct;
  }
}

module.exports = ProductFactory;
