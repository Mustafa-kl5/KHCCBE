const express = require("express");
const { authorization } = require("../../Utils/jwtUtils");
const validationRole = require("../../validation/validationRole");
const validationMiddleware = require("../../validation/validationMiddleware");
const addPatientController = require("../../Controllers/nursing/addPatient");

const patientSchema = require("../../validationSchema/patientSchema");
const getPatientList = require("../../Controllers/nursing/getPatientsList");

const nursingRoutes = express.Router();

nursingRoutes.post(
  "/nursing/addPatient",
  validationMiddleware(patientSchema),
  authorization,
  validationRole,
  addPatientController
);
nursingRoutes.get(
  "/nursing/patientList",
  authorization,
  validationRole,
  getPatientList
);

module.exports = nursingRoutes;
