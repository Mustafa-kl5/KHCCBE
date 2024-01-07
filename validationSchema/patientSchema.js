const Joi = require("joi");

const patientSchema = Joi.object().keys({
  studyId: Joi.string().required(),
  patientName: Joi.string().required(),
  ssn: Joi.string().allow("").optional(),
  mrn: Joi.string().allow("").optional(),
  dayCode: Joi.string().required(),
  researchId: Joi.string().required(),
  birthDate: Joi.string().required(),
  admitionRecDate: Joi.string().required(),
  gender: Joi.string().required(),
  sampleDrawing: Joi.string().required(),
});
module.exports = patientSchema;
