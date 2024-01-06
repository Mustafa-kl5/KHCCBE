const Joi = require("joi");

const rejectSampleSchema = Joi.object().keys({
  sampleId: Joi.string().required(),
  rejectionReason: Joi.string().required(),
});
module.exports = rejectSampleSchema;
