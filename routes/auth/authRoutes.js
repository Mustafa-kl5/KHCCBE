const express = require("express");
const loginSchemas = require("../../validationSchema/loginSchema");
const registrationSchema = require("../../validationSchema/registrationSchema");
const validationMiddleware = require("../../validation/validationMiddleware");
const loginController = require("../../Controllers/auth/login");
const registrationController = require("../../Controllers/auth/registration");
const authRoutes = express.Router();
authRoutes.post(
  "/auth/login",
  validationMiddleware(loginSchemas),
  loginController
);
authRoutes.post(
  "/auth/registration",
  validationMiddleware(registrationSchema),
  registrationController
);
module.exports = authRoutes;
