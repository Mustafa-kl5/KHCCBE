const express = require("express");
const { authorization } = require("../../Utils/jwtUtils");
const validationRole = require("../../validation/validationRole");
const getPatients = require("../../Controllers/technician/getPatients");
const seen = require("../../Controllers/technician/seen");
const validationMiddleware = require("../../validation/validationMiddleware");
const seenSchema = require("../../validationSchema/seenSchema");

const technicianRoutes = express.Router();

technicianRoutes.get(
  "/technician/patients",
  authorization,
  validationRole,
  getPatients
);

technicianRoutes.put(
  "/technician/giveSeen",
  validationMiddleware(seenSchema),
  authorization,
  validationRole,
  seen
);

module.exports = technicianRoutes;
