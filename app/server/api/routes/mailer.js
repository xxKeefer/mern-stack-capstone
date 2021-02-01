const express = require("express");
const auth = require("../../middleware/auth");

let router = express.Router();
const { sendNewsletter, sendFeedback } = require("../../controller/mailer");

router.route("/send").post(auth.admin, sendNewsletter);
router.route("/feedback").post(auth.user, sendFeedback);

module.exports = router;
