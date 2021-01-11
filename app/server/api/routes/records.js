const express = require("express");
let router = express.Router();

const {
  query,
  complexQuery,
  sendCompactDB,
} = require("../../controller/records");

//router.route("/genre/Jazz").post(query);
router.route("/:category/:query").get(query);

router.route("/complex/:queryObj").post(complexQuery);

router.route("/search").get(sendCompactDB);

module.exports = router;
