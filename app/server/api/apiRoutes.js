const express = require("express");
let router = express.Router();

const auth = require("./routes/auth");
const example = require("./routes/example");
const admin = require("./routes/admin");
const shop = require("./routes/shop");
const customer = require("./routes/customer");
const blog = require("./routes/blog");
const mailer = require("./routes/mailer");

router.use("/auth", auth);
router.use("/example", example);
router.use("/admin", admin);
router.use("/shop", shop);
router.use("/customer", customer);
router.use("/blog", blog);
router.use("/mailer", mailer);

module.exports = router;
