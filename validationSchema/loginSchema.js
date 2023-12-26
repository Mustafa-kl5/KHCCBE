const Joi = require("joi");

const loginSchemas = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
module.exports = loginSchemas;
