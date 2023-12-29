const Joi = require("joi");

const deletedReasonSchema = Joi.object().keys({
  reason: Joi.string().required(),
  patientId: Joi.string().required(),
});
module.exports = deletedReasonSchema;
