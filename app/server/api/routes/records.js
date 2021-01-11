const express = require("express");
let router = express.Router();

const { query, sendCompactDB } = require("../../controller/records");

router.route("/").post(query);

router.route("/search").get(sendCompactDB);

module.exports = router;
