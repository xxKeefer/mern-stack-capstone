require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

let mailOptions = {
  from: "xxkeefer.test@gmail.com",
  to: "xxkeefer.code@gmail.com",
  subject: "Testing Nodemailer",
  text: "This is a test. Mic check 1 2, 1 2.",
};

transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    console.log(`Error sending mail to: ${mailOptions.to}\n`, err.message);
  } else {
    console.log(`Mail sent to: ${mailOptions.to}`);
  }
});
