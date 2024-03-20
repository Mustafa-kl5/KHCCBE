const express = require("express");
const usersPermission = require("../../Controllers/superAdmin/usersPermission");
const { authorization } = require("../../Utils/jwtUtils");
const validationRole = require("../../validation/validationRole");
const permissionSchema = require("../../validationSchema/permissionSchema");
const validationMiddleware = require("../../validation/validationMiddleware");
const givePermission = require("../../Controllers/superAdmin/givePermission");
const studySchema = require("../../validationSchema/study");
const addStudy = require("../../Controllers/superAdmin/addStudy");
const uploadFileMiddleware = require("../../Utils/uploadFile");
const getStudies = require("../../Controllers/superAdmin/getStudies");
const getPendingStudies = require("../../Controllers/superAdmin/getPendingStudies");
const freezerSchema = require("../../validationSchema/freezer");
const addFreezer = require("../../Controllers/superAdmin/addFreezer");
const getFreezers = require("../../Controllers/superAdmin/getFreezers");
const DeleteFreezer = require("../../Controllers/superAdmin/DeleteFreezer");
const getLogs = require("../../Controllers/superAdmin/getLogs");
const approveStudy = require("../../Controllers/superAdmin/approveStudy");
const approveStudySchema = require("../../validationSchema/approveStudySchema");
const freezerStatistics = require("../../Controllers/superAdmin/freezerStatistics");
const studiesStatistics = require("../../Controllers/superAdmin/studiesStatistics");

const superAdminRoutes = express.Router();
superAdminRoutes.get(
  "/superAdmin/userPermission",
  authorization,
  validationRole(["superAdmin"]),
  usersPermission
);
superAdminRoutes.get(
  "/superAdmin/getStudies",
  authorization,
  validationRole(["superAdmin"]),
  getStudies
);
superAdminRoutes.get(
  "/superAdmin/getPendingStudies",
  authorization,
  validationRole(["superAdmin"]),
  getPendingStudies
);
superAdminRoutes.get(
  "/superAdmin/getFreezers",
  authorization,
  validationRole(["superAdmin", "technician"]),
  getFreezers
);
superAdminRoutes.get(
  "/superAdmin/getLogs",
  authorization,
  validationRole(["superAdmin"]),
  getLogs
);
superAdminRoutes.get(
  "/superAdmin/getFreezerStatistics",
  authorization,
  validationRole(["superAdmin"]),
  freezerStatistics
);
superAdminRoutes.get(
  "/superAdmin/getStudiesStatistics",
  authorization,
  validationRole(["superAdmin"]),
  studiesStatistics
);
superAdminRoutes.put(
  "/superAdmin/givePermission",
  validationMiddleware(permissionSchema),
  authorization,
  validationRole(["superAdmin"]),
  givePermission
);
superAdminRoutes.put(
  "/superAdmin/approveStudy",
  validationMiddleware(approveStudySchema),
  authorization,
  validationRole(["superAdmin"]),
  approveStudy
);

superAdminRoutes.delete(
  "/superAdmin/giveDeleteFreezerReason",
  authorization,
  validationRole(["superAdmin"]),
  DeleteFreezer
);

superAdminRoutes.post(
  "/superAdmin/addStudy",
  validationMiddleware(studySchema),
  authorization,
  validationRole(["superAdmin", "nursing", "technician"]),
  uploadFileMiddleware,
  addStudy
);
superAdminRoutes.post(
  "/superAdmin/addFreezer",
  validationMiddleware(freezerSchema),
  authorization,
  validationRole(["superAdmin"]),
  addFreezer
);

module.exports = superAdminRoutes;
