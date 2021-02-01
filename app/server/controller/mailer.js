if (process.env.NODE_ENV !== "production") require("dotenv").config();
const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

//HELPERS
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname, "../views"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "../views"),
  extName: ".handlebars",
};

// transporter.use("compile", hbs(handlebarOptions));

let mailOptions = {
  from: "xxkeefer.test@gmail.com",
  to: "xxkeefer.code@gmail.com",
  subject: "Testing Nodemailer",
  text: "",
};

//EXPORTS

const sendNewsletter = (req, res) => {
  const { from, to, subject, context } = req.body;
  transporter.sendMail(
    { from, to, subject, template: "newsletter", context },
    (err, data) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(200).json({ message: `mail sent to: ${to}` });
      }
    }
  );
};

const sendFeedback = (req, res) => {
  const { name, email: user_email, message: feedback } = req.body;
  const mailOptions = {
    from: process.env.FEEDBACK_MAILER,
    to: process.env.FEEDBACK_MAILBOX,
    subject: `FEEDBACK from ${name} @ ${user_email}`,
    text: `${name} @ ${user_email} writes: \n ${feedback}`,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({ message: `mail sent to: ${mailOptions.to}` });
      console.log(`FEEDBACK:: received from: ${user_email}`);
    }
  });
};

module.exports = { sendNewsletter, sendFeedback };
