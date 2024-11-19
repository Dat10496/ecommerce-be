"use strict";
const express = require("express");
const productController = require("../../controllers/access.controller");
const { asyncHandle } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/utilsAuth");
const router = express.Router();

// Authentication
router.use(authentication);

router.post("", asyncHandle(productController.createProduct));

module.exports = router;
