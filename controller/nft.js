const Nft = require("../model/nft");
const nft = new Nft();
const {
  mintValidation,
  auctionValidation,
  biddingValidation,
  auctionTransferValidation,
  directTransferValidation,
  fixedPriceValidation,
} = require("../joiSchemas/schemas");

module.exports.nftMint = async (req, res, next) => {
  const payload = req.body;
  const image = req.file.filename;

  console.log(image);

  try {
    // Validate the payload against the schema
    const { error, value } = mintValidation.validate(payload);

    if (error) return res.status(400).json({ error: error.details[0].message });

    await nft.nftMint(value, image);
    return res.status(201).json({ message: `NFT minted` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.addAuction = async (req, res, next) => {
  const payload = req.body;

  try {
    const { error, value } = auctionValidation.validate(payload);

    if (error) return res.status(400).json({ error: error.details[0].message });

    await nft.addAuction(value);

    await nft.updatenft(value.tokenId);
    return res.status(200).json({ message: `Added on Auction` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.addOnFixedPrice = async (req, res, next) => {
  const payload = req.body;

  try {
    const { error, value } = fixedPriceValidation.validate(payload);

    if (error) return res.status(400).json({ error: error.details[0].message });

    await nft.addOnFixedPrice(value);
    return res
      .status(201)
      .json({ message: `Nft Listed for Sale on Fixed Price` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.fixedPriceNftTransfer = async (req, res, next) => {
  const payload = req.body;

  try {
    const { error, value } = directTransferValidation.validate(payload);

    if (error) return res.status(400).json({ error: error.details[0].message });
    await nft.fixedPriceNftTransfer(value);
    await nft.upateFixedPriceForTrasfer(value.tokenId, value.orderId);
    await nft.upateNftForFixedPriceTrasfer(value.tokenId, value.transferTo);
    return res
      .status(200)
      .json({ message: `Successfully transfered token: ${value.tokenId}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.bidding = async (req, res, next) => {
  const payload = req.body;

  try {
    const { error, value } = biddingValidation.validate(payload);

    if (error) return res.status(400).json({ error: error.details[0].message });
    await nft.bidding(value);
    const { bidderAddress, price } = value;
    await nft.updateAuction(bidderAddress, price);
    return res.status(200).json({ message: `Successfully Bidded` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.auctionTransfer = async (req, res, next) => {
  const payload = req.body;

  try {
    const { error, value } = auctionTransferValidation.validate(payload);

    if (error) return res.status(400).json({ error: error.details[0].message });
    await nft.auctionTransfer(value);
    await nft.upateAuctionForTrasfer(value.tokenId, value.auctionId);
    await nft.upateNftForAuctionTrasfer(value.tokenId, value.transferTo);
    return res
      .status(200)
      .json({ message: `Successfully transfered token: ${value.tokenId}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
