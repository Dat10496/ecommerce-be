"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandle } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/utilsAuth");
const router = express.Router();

//signIn
router.post("/shop/login", asyncHandle(accessController.signIn));

// singUp
router.post("/shop/signup", asyncHandle(accessController.signUp));

// Authentication
router.use(authentication);

router.post("/shop/logout", asyncHandle(accessController.signOut));
router.post(
  "/shop/handleRefreshToken",
  asyncHandle(accessController.handleRefreshToken)
);

module.exports = router;
