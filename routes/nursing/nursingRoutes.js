const express = require("express");
const { authorization } = require("../../Utils/jwtUtils");
const validationRole = require("../../validation/validationRole");
const validationMiddleware = require("../../validation/validationMiddleware");
const addPatientController = require("../../Controllers/nursing/addPatient");

const patientSchema = require("../../validationSchema/patientSchema");
const getPatientList = require("../../Controllers/nursing/getPatientsList");
const giveDeletePaitentReason = require("../../Controllers/nursing/giveDeletePaitentReason");
const deletedReasonSchema = require("../../validationSchema/deletedReasonSchema");
const sampleSchema = require("../../validationSchema/sampleSchema");
const addSample = require("../../Controllers/nursing/addSample");
const getPatient = require("../../Controllers/nursing/getPatient");

const nursingRoutes = express.Router();

nursingRoutes.post(
  "/nursing/addPatient",
  validationMiddleware(patientSchema),
  authorization,
  validationRole(["nursing"]),
  addPatientController
);
nursingRoutes.post(
  "/nursing/addSample",
  validationMiddleware(sampleSchema),
  authorization,
  validationRole(["nursing"]),
  addSample
);
nursingRoutes.get(
  "/nursing/patientList",
  authorization,
  validationRole(["nursing"]),
  getPatientList
);
nursingRoutes.get(
  "/nursing/foundPatient",
  authorization,
  validationRole(["nursing", "technician"]),
  getPatient
);
nursingRoutes.put(
  "/nursing/giveDeletePaitentReason",
  validationMiddleware(deletedReasonSchema),
  authorization,
  validationRole(["nursing"]),
  giveDeletePaitentReason
);

module.exports = nursingRoutes;
