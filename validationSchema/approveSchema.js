const Joi = require("joi");

const approveSampleSchema = Joi.object().keys({
  sampleId: Joi.string().required(),
  khccBioSampleCode: Joi.string().required(),
});
module.exports = approveSampleSchema;
