const express = require("express");
let router = express.Router();

const { payNow } = require("../../controller/payments");

router.route("/:nonce/:token").post(payNow);

module.exports = router;
