const express = require("express");
let router = express.Router();
const {
  promoteAdmin,
  demoteAdmin,
  listAdmins,
} = require("../../controller/admin");
const auth = require("../../middleware/auth");

router.route("/promote").post(auth.superAdmin, promoteAdmin);

router.route("/demote").post(auth.superAdmin, demoteAdmin);

router.route("/list").get(auth.superAdmin, listAdmins);

module.exports = router;
