const Joi = require("joi");

module.exports.mintValidation = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  ownerWalletAddress: Joi.string().required(),
  token: Joi.string().required(),
  transectionHash: Joi.string().required(),
});
