const express = require("express");
let router = express.Router();

const auth = require("./routes/auth");
const example = require("./routes/example");
const admin = require("./routes/admin");
const shop = require("./routes/shop");
const blog = require("./routes/blog");

router.use("/auth", auth);
router.use("/example", example);
router.use("/admin", admin);
router.use("/shop", shop);
router.use("/blog", blog);

module.exports = router;
