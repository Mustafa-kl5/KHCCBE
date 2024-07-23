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
const getApprovalSamples = require("../../Controllers/technician/getApprovalSamples");
const saveSample = require("../../Controllers/technician/saveSample");
const getEmptyCells = require("../../Controllers/technician/getEmptyCells");
const sampleToExport = require("../../Controllers/technician/sampleToExport");
const removeSamplesFormFreezer = require("../../Controllers/technician/removeSamplesFormFreezer");
const removeSample = require("../../validationSchema/removeSamples");
const samplesBackups = require("../../Controllers/technician/samplesBackups");
const GenerateReportForSampleOnFreezer = require("../../Controllers/technician/reports");
const GenerateReportForExportedSample = require("../../Controllers/technician/backUpReport");

const technicianRoutes = express.Router();

technicianRoutes.get(
  "/technician/patients",
  authorization,
  validationRole(["technician"]),
  getPatients
);
technicianRoutes.get(
  "/technician/getSamples",
  authorization,
  validationRole(["technician"]),
  getSamples
);
technicianRoutes.get(
  "/technician/getApprovalSamples",
  authorization,
  validationRole(["technician"]),
  getApprovalSamples
);
technicianRoutes.get(
  "/technician/getEmptyCells",
  authorization,
  validationRole(["technician"]),
  getEmptyCells
);
technicianRoutes.get(
  "/technician/sampleToExport",
  authorization,
  validationRole(["technician"]),
  sampleToExport
);
technicianRoutes.get(
  "/technician/sampleToExportBackup",
  authorization,
  validationRole(["technician", "superAdmin"]),
  samplesBackups
);
technicianRoutes.get(
  "/technician/GenerateReportForSampleOnFreezer",
  authorization,
  validationRole(["technician"]),
  GenerateReportForSampleOnFreezer
);
technicianRoutes.get(
  "/technician/GenerateReportForExportedSample",
  authorization,
  validationRole(["technician"]),
  GenerateReportForExportedSample
);
technicianRoutes.delete(
  "/technician/removeSamplesFormFreezer",
  authorization,
  validationRole(["technician"]),
  removeSamplesFormFreezer
);

technicianRoutes.put(
  "/technician/giveSeen",
  validationMiddleware(seenSchema),
  authorization,
  validationRole(["technician"]),
  markAsSeen
);

technicianRoutes.put(
  "/technician/rejectSample",
  validationMiddleware(rejectSampleSchema),
  authorization,
  validationRole(["technician"]),
  rejectSample
);
technicianRoutes.put(
  "/technician/approveSample",
  validationMiddleware(approveSampleSchema),
  authorization,
  validationRole(["technician"]),
  approveSample
);
technicianRoutes.post(
  "/technician/saveSample",
  authorization,
  validationRole(["technician"]),
  saveSample
);
module.exports = technicianRoutes;
