const Joi = require("joi");

module.exports.mintValidation = Joi.object({
  title: Joi.string().required(),
  // image: Joi.string().required(),
  description: Joi.string().required(),
  ownerWalletAddress: Joi.string().required(),
  tokenId: Joi.number().required(),
  transectionHash: Joi.string().required(),
});
module.exports.auctionValidation = Joi.object({
  tokenId: Joi.number().required(),
  auctionId: Joi.number().required(),
  heighestBid: Joi.number().required(),
  owner: Joi.string().required(),
  startingPrice: Joi.number().required(),
  endTime: Joi.string().required(),
  heighestBidder: Joi.string().required(),
});
module.exports.fixedPriceValidation = Joi.object({
  tokenId: Joi.number().required(),
  price: Joi.number().required(),
  owner: Joi.string().required(),
  transectionHash: Joi.string().required(),
  orderId: Joi.number().required(),
});
module.exports.biddingValidation = Joi.object({
  auctionId: Joi.number().required(),
  bidderAddress: Joi.string().required(),
  price: Joi.number().required(),
});

module.exports.auctionTransferValidation = Joi.object({
  transferFrom: Joi.string().required(),
  transferTo: Joi.string().required(),
  price: Joi.number().required(),
  auctionId: Joi.number().required(),
  tokenId: Joi.number().required(),
});

module.exports.directTransferValidation = Joi.object({
  transferFrom: Joi.string().required(),
  transferTo: Joi.string().required(),
  price: Joi.number().required(),
  orderId: Joi.number().required(),
  tokenId: Joi.number().required(),
});
