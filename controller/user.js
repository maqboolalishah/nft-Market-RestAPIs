const bcrypt = require("bcrypt");
// const sendingMail = require("../email/email");
const sendMail = require("../email/email");
const { v4: uuidv4 } = require("uuid");
const otpGenerator = require("otp-generator");

const User = require("../model/user");

const user = new User();

module.exports.signUp = async (req, res) => {
  try {
    const { walletAddress, username, password, email } = req.body;

    if (!walletAddress || !username || !password || !email)
      return res.status(400).json("Bad request");

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = uuidv4();

    const data = {
      walletAddress,
      username,
      email,
      hashPassword,
      verificationToken,
    };

    // console.log(data);
    // Check email
    const [ifExist] = await user.checkEmail(data.email);
    if (ifExist.length > 0) return res.status(409).json("Email already Exist");

    // Check username
    const [ifExistUsername] = await user.checkUsername(data.username);
    if (ifExistUsername.length > 0)
      return res.status(409).json("Username already Exist");
    // Save the user
    const registration = await user.signUp(data);

    if (registration) {
      const message = `
      Please click on the following link to verify your email: http://localhost:8000/api/verifyUser/${verificationToken}
    `;
      await sendMail({
        email: data.email,
        subject: "Email Verification",
        html: message,
      });
      return res
        .status(200)
        .json({ message: `Verification Link is send at your gmail address` });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json("Bad Request");
    const [isSignIn] = await user.signIn(email);
    if (isSignIn.length > 0) {
      if (isSignIn[0].status != 1)
        return res
          .status(401)
          .json({ message: "Please verify your email address" });
      const passwordMatch = await bcrypt.compare(
        password,
        isSignIn[0].password
      );
      if (!passwordMatch)
        return res
          .status(403)
          .json({ message: "Password or Email is Invalid" });
    }
    if (isSignIn) {
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: true,
        specialChars: false,
      });

      console.log(otp);
      const otpUpdated = await user.addOtp(otp, email);

      if (otpUpdated) {
        const message = `
        ${otp}
      `;
        await sendMail({
          email: email,
          subject: "Otp",
          html: message,
        });
        return res
          .status(200)
          .json({ message: `Otp is send at your gmail address` });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
