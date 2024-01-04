const express = require("express");
const { authorization } = require("../../Utils/jwtUtils");
const validationRole = require("../../validation/validationRole");
const getPatients = require("../../Controllers/technician/getPatients");
const seen = require("../../Controllers/technician/seen");
const validationMiddleware = require("../../validation/validationMiddleware");
const seenSchema = require("../../validationSchema/seenSchema");
const markAsSeen = require("../../Controllers/technician/seen");
const getSamples = require("../../Controllers/technician/getSamples");

const technicianRoutes = express.Router();

technicianRoutes.get(
  "/technician/patients",
  authorization,
  validationRole("technician"),
  getPatients
);
technicianRoutes.get(
  "/technician/getSamples",
  authorization,
  validationRole("technician"),
  getSamples
);

technicianRoutes.put(
  "/technician/giveSeen",
  validationMiddleware(seenSchema),
  authorization,
  validationRole("technician"),
  markAsSeen
);

module.exports = technicianRoutes;
