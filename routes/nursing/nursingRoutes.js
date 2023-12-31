const express = require("express");
const { authorization } = require("../../Utils/jwtUtils");
const validationRole = require("../../validation/validationRole");
const validationMiddleware = require("../../validation/validationMiddleware");
const addPatientController = require("../../Controllers/nursing/addPatient");

const patientSchema = require("../../validationSchema/patientSchema");
const getPatientList = require("../../Controllers/nursing/getPatientsList");
const giveDeletePaitentReason = require("../../Controllers/nursing/giveDeletePaitentReason");
const deletedReasonSchema = require("../../validationSchema/deletedReasonSchema");

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
nursingRoutes.put(
  "/nursing/giveDeletePaitentReason",
  validationMiddleware(deletedReasonSchema),
  authorization,
  validationRole,
  giveDeletePaitentReason
);

module.exports = nursingRoutes;
