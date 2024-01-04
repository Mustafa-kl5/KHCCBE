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
const freezerSchema = require("../../validationSchema/freezer");
const addFreezer = require("../../Controllers/superAdmin/addFreezer");
const getFreezers = require("../../Controllers/superAdmin/getFreezers");
const DeleteFreezer = require("../../Controllers/superAdmin/DeleteFreezer");

const superAdminRoutes = express.Router();
superAdminRoutes.get(
  "/superAdmin/userPermission",
  authorization,
  validationRole("superAdmin"),
  usersPermission
);
superAdminRoutes.get(
  "/superAdmin/getStudies",
  authorization,
  validationRole("superAdmin"),
  getStudies
);
superAdminRoutes.get(
  "/superAdmin/getFreezers",
  authorization,
  validationRole,
  getFreezers
);
superAdminRoutes.put(
  "/superAdmin/givePermission",
  validationMiddleware(permissionSchema),
  authorization,
  validationRole("superAdmin"),
  givePermission
);

superAdminRoutes.delete(
  "/superAdmin/giveDeleteFreezerReason",
  authorization,
  validationRole,
  DeleteFreezer
);

superAdminRoutes.post(
  "/superAdmin/addStudy",
  validationMiddleware(studySchema),
  authorization,
  validationRole("superAdmin"),
  uploadFileMiddleware,
  addStudy
);
superAdminRoutes.post(
  "/superAdmin/addFreezer",
  validationMiddleware(freezerSchema),
  authorization,
  validationRole,
  addFreezer
);

module.exports = superAdminRoutes;
