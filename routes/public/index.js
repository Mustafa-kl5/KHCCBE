const express = require("express");
const getStudiesOption = require("../../Controllers/publicControllers/getStudiesOption");

const publicRoutes = express.Router();
publicRoutes.get("/public/getStudiesOption", getStudiesOption);
module.exports = publicRoutes;
