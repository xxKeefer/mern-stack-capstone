const express = require("express");
let router = express.Router();
const log = require("../middleware/logger");
router.use(log.route);

const admin = require("./routes/admin");
const auth = require("./routes/auth");
const blog = require("./routes/blog");
const customer = require("./routes/customer");
const example = require("./routes/example");
const mailer = require("./routes/mailer");
const orders = require("./routes/orders");
const payments = require("./routes/payments");
const records = require("./routes/records");
const shop = require("./routes/shop");

router.use("/admin", admin);
router.use("/auth", auth);
router.use("/blog", blog);
router.use("/customer", customer);
router.use("/example", example);
router.use("/mailer", mailer);
router.use("/orders", orders);
router.use("/payments", payments);
router.use("/records", records);
router.use("/shop", shop);

module.exports = router;
