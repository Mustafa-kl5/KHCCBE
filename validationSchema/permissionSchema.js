const Joi = require("joi");

const permissionSchema = Joi.object().keys({
  permission: Joi.string().required(),
  userId: Joi.string().required(),
});
module.exports = permissionSchema;
