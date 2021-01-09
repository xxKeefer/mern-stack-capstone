const express = require("express");
const auth = require("../../middleware/auth");

let router = express.Router();
//Make it so only admins can do this.
router.use(auth.admin);

const { searchDiscogs } = require("../../controller/discogs");

router.route("/search").get(searchDiscogs);

module.exports = router;
