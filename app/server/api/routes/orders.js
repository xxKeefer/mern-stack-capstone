const express = require("express");
let router = express.Router();
const {
  createOrder,
  searchAllOwned,
  retrieveOrder,
} = require("../../controller/orders");

router.route("/").post(createOrder);

router.route("/search").get(searchAllOwned);

router.route("/search/:id").get(retrieveOrder);

module.exports = router;
