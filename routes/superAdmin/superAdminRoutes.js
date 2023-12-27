const express = require("express");
const usersPermission = require("../../Controllers/superAdmin/usersPermission");
const { authorization } = require("../../Utils/jwtUtils");
const validationRole = require("../../validation/validationRole");
const permissionSchema = require("../../validationSchema/permissionSchema");
const validationMiddleware = require("../../validation/validationMiddleware");

const superAdminRoutes = express.Router();
superAdminRoutes.get(
  "/superAdmin/userPermission",
  authorization,
  validationRole,
  usersPermission
);
superAdminRoutes.post(
  "/superAdmin/givePermission",
  validationMiddleware(permissionSchema),
  authorization,
  validationRole,
  usersPermission
);
module.exports = superAdminRoutes;
