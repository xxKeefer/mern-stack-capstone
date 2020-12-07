const express = require("express");
let router = express.Router();
const {
  examplePublic,
  examplePrivate,
  exampleAdmin,
  exampleSuper,
} = require("../../controller/example");
const auth = require("../../middleware/auth");

router.route("/public").get(examplePublic);

router.route("/private").get(auth.user, examplePrivate);

router.route("/admin").get(auth.admin, exampleAdmin);

router.route("/super").get(auth.superAdmin, exampleSuper);

module.exports = router;
