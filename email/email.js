const nodemailer = require("nodemailer");
const sendMail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  // 2) Define the email options
  const mailOptions = {
    from: "Kunstify-<maqboolali741@gmail.com>",
    to: options.email,
    subject: options.subject,
    html: options.html,
    // html:
  };
  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};
module.exports = sendMail;
