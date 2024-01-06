const express = require("express");
const { authorization } = require("../../Utils/jwtUtils");
const validationRole = require("../../validation/validationRole");
const getPatients = require("../../Controllers/technician/getPatients");
const seen = require("../../Controllers/technician/seen");
const validationMiddleware = require("../../validation/validationMiddleware");
const seenSchema = require("../../validationSchema/seenSchema");
const markAsSeen = require("../../Controllers/technician/seen");
const getSamples = require("../../Controllers/technician/getSamples");
const rejectSample = require("../../Controllers/technician/rejectSample");
const rejectSampleSchema = require("../../validationSchema/sampleReject");
const approveSampleSchema = require("../../validationSchema/approveSchema");
const approveSample = require("../../Controllers/technician/approveSample");

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

technicianRoutes.put(
  "/technician/rejectSample",
  validationMiddleware(rejectSampleSchema),
  authorization,
  validationRole("technician"),
  rejectSample
);
technicianRoutes.put(
  "/technician/approveSample",
  validationMiddleware(approveSampleSchema),
  authorization,
  validationRole("technician"),
  approveSample
);
module.exports = technicianRoutes;
