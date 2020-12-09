require("dotenv").config();
const nodemailer = require("nodemailer");

//HELPERS
const transporter = nodemailer.createTransport({
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

//EXPORTS

const sendNewsletter = (req, res) => {
  const { from, to, subject, text } = req.body;
  transporter.sendMail({ from, to, subject, text }, (err, data) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({ message: `mail sent to: ${to}` });
    }
  });
};

module.exports = { sendNewsletter };
