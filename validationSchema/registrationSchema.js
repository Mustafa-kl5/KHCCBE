const Joi = require("joi");

const registrationSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  employeeId: Joi.string().required(),
  position: Joi.string().required(),
  department: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});
module.exports = registrationSchema;
