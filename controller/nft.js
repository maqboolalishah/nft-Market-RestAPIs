const Nft = require("../model/nft");
const nft = new Nft();
const { mintValidation, auctionValidation } = require("../joiSchemas/schemas");

module.exports.nftMint = async (req, res, next) => {
  const payload = req.body;
  const image = req.file.filename;

  console.log(image);

  try {
    // Validate the payload against the schema
    const { error, value } = mintValidation.validate(payload);

    if (error) return res.status(400).json({ error: error.details[0].message });

    await nft.nftMint(value, image);
    return res.status(200).json({ message: `NFT minted` });
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
    return res.status(200).json({ message: `Added on Auction` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

auctionValidation;
