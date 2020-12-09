const express = require("express");
const auth = require("../../middleware/auth");

let router = express.Router();
const { sendNewsletter } = require("../../controller/mailer");

router.route("/send").post(auth.admin, sendNewsletter);

module.exports = router;
