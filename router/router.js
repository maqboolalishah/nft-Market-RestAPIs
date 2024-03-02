const express = require('express');
const { signUp, signIn } = require('../controller/user');
const { VerifiyToken, verifiyOtp } = require('../controller/verificationUser');
const {
  nftMint,
  addAuction,
  bidding,
  auctionTransfer,
  addOnFixedPrice,
  fixedPriceNftTransfer,
  fetchAllNfts,
  fetchSingleNft,
  fetchNftCollection,
} = require('../controller/nft');
const imageUpload = require('../services/imageUpload');
const router = new express.Router();

router.post('/signUp', signUp);
router.get('/verifyUser/:token', VerifiyToken);
router.post('/signIn', signIn);
router.post('/verifyotp', verifiyOtp);
router.post('/nftMint', imageUpload, nftMint);
router.post('/addAuction', addAuction);
router.post('/bidding', bidding);
router.post('/auctionTransfer', auctionTransfer);
router.post('/addOnFixedPrice', addOnFixedPrice);
router.post('/fixedPriceNftTransfer', fixedPriceNftTransfer);
router.get('/fetchAllNfts', fetchAllNfts);
router.get('/fetchSingleNft/:tokenId', fetchSingleNft);
router.get('/fetchNftCollection/:walletAddress', fetchNftCollection);

module.exports = router;
