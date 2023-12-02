const Joi = require("joi");

const joiUser = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(3).required(),
});

module.exports = {
  joiUser,
};
