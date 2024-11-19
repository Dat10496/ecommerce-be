"use strict";

const ProductFactory = require("../services/product.service");
const { ResponseSuccess } = require("../core/success.response");

class ProductController {
  createProduct = async (req, res, next) => {
    new ResponseSuccess({
      message: "Product created successfully",
      metadata: await ProductFactory.createProduct(
        req.body.product_type,
        req.body
      ),
    }).send(res);
  };
}

module.exports = new ProductController();
