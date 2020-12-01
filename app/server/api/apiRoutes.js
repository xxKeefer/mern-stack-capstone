const express = require("express");
let router = express.Router();

const auth = require("./routes/auth");
const example = require("./routes/example");
const admin = require("./routes/admin");

router.use("/auth", auth);
router.use("/example", example);
router.use("/admin", admin);

module.exports = router;
