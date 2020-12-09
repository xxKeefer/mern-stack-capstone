const express = require("express");
let router = express.Router();
const { sendNewsletter } = require("../../controller/shop");

router.route("/send").post(sendNewsletter);

module.exports = router;
