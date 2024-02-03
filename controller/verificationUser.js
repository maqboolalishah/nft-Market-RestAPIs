const User = require("../model/user");
const user = new User();

module.exports.VerifiyToken = async (req, res, next) => {
  try {
    const verificationToken = req.params.token;

    if (!verificationToken) return res.status(400).json("Bad Request");

    // Verifying the token
    const checkIfTokenIsValid = await user.VerifiyToken(verificationToken);

    if (!checkIfTokenIsValid) return res.status(400).json("Bad Request");
    // Update user status
    await user.updateUserStatus(verificationToken);
    return res.status(200).json("user verified successfully");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.verifiyOtp = async (req, res, next) => {
  try {
    const { otp } = req.body;
    if (!otp) return res.status(400).json("adBad Request");
    let [isOtpVerified] = await user.verifiyOtp(otp);
    delete isOtpVerified[0].password;
    delete isOtpVerified[0].verificationToken;
    return res.status(200).json(isOtpVerified[0]);
  } catch (error) {
    return error.message;
  }
};
