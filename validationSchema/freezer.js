const Joi = require("joi");

const freezerSchema = Joi.object().keys({
  freezerName: Joi.string().required(),
  freezerModel: Joi.string().required(),
  freezerLocation: Joi.string().required(),
  freezerType: Joi.string().required(),
  NumberOfShelves: Joi.number().required(),
  BoxesPerShelf: Joi.number().required(),
});
module.exports = freezerSchema;
