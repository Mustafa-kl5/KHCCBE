const Joi = require("joi");

const studySchema = Joi.object().keys({
  studyName: Joi.string().required(),
  piName: Joi.string().required(),
  studyNumber: Joi.string().required(),
  studyKeywords: Joi.string().required(),
  studyInitDate: Joi.string().required(),
  files: Joi.array().items(Joi.string()),
});
module.exports = studySchema;
