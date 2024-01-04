const Joi = require("joi");

const sampleSchema = Joi.object({
  studyNumber: Joi.string().required(),
  patientId: Joi.string().required(),
  samples: Joi.array().items(
    Joi.object({
      sampleType: Joi.string().required(),
      containerType: Joi.string().required(),
      numberOfSamples: Joi.string().required(),
      drawnAt: Joi.string().required(),
      sampleSerial: Joi.string().required(),
      storageType: Joi.string().required(),
    })
  ),
});
module.exports = sampleSchema;
