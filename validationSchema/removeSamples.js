const Joi = require("joi");

const removeSample = Joi.object({
  samples: Joi.array().items(Joi.string()),
});
module.exports = removeSample;
