const Joi = require("joi");

const deletedReasonSchema = Joi.object().keys({
  reason: Joi.string().required(),
  Id: Joi.string().required(),
});
module.exports = deletedReasonSchema;
