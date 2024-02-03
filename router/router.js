const express = require("express");
const { signUp, signIn } = require("../controller/user");
const { VerifiyToken, verifiyOtp } = require("../controller/verificationUser");
const { nftMint } = require("../controller/nft");
const router = new express.Router();

router.post("/signUp", signUp);
router.get("/verifyUser/:token", VerifiyToken);
router.post("/signIn", signIn);
router.post("/verifyotp", verifiyOtp);
router.post("/nftMint", nftMint);

module.exports = router;
