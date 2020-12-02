const express = require("express");
let router = express.Router();
const { addItem } = require("../../controller/shop");

router.route("/add").post(addItem);

module.exports = router;
