const Joi = require("joi");

module.exports.mintValidation = Joi.object({
  title: Joi.string().required(),
  // image: Joi.string().required(),
  description: Joi.string().required(),
  ownerWalletAddress: Joi.string().required(),
  token: Joi.string().required(),
  transectionHash: Joi.string().required(),
});
module.exports.auctionValidation = Joi.object({
  tokenId: Joi.string().required(),
  heighestBid: Joi.number().required(),
  owner: Joi.string().required(),
  startingPrice: Joi.number().required(),
  endTime: Joi.string().required(),
  heighestBidder: Joi.string().required(),
});
