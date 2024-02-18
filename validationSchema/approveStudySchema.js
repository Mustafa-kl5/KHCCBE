const Joi = require("joi");

const approveStudySchema = Joi.object().keys({
  studyId: Joi.string().required(),
});
module.exports = approveStudySchema;
