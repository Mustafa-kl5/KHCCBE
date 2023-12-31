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

const superAdminRoutes = express.Router();
superAdminRoutes.get(
  "/superAdmin/userPermission",
  authorization,
  validationRole,
  usersPermission
);
superAdminRoutes.get(
  "/superAdmin/getStudies",
  authorization,
  validationRole,
  getStudies
);
superAdminRoutes.put(
  "/superAdmin/givePermission",
  validationMiddleware(permissionSchema),
  authorization,
  validationRole,
  givePermission
);
superAdminRoutes.post(
  "/superAdmin/addStudy",
  validationMiddleware(studySchema),
  authorization,
  validationRole,
  uploadFileMiddleware,
  addStudy
);
module.exports = superAdminRoutes;
