const Joi = require("joi");

const seenSchema = Joi.object().keys({
  patientId: Joi.string().required(),
});
module.exports = seenSchema;
