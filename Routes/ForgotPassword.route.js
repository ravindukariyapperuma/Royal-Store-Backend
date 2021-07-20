const express = require("express");
const router = express.Router();

const ForgotPasswordController = require("../Controllers/ForgotPassword.controller");

const ForgotPasswordMiddleware = require("../Middlewares/ForgotPassword.middleware");

router.post("/", ForgotPasswordController.sendLink);

router.post(
  "/reset-password/:id/:token",
  ForgotPasswordMiddleware.validate,
  ForgotPasswordController.resetPassword
);

module.exports = router;
