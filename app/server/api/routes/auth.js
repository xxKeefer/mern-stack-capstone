const express = require("express");
let router = express.Router();
const {
  createUser,
  loginUser,
  logoutUser,
  sessionCheck,
} = require("../../controller/auth");

router.route("/signup").post(createUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/session").get(sessionCheck);

module.exports = router;
