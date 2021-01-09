const express = require("express");
let router = express.Router();
const auth = require("../../middleware/auth");
router.use(auth.user);
const {
  addCart,
  removeCart,
  emptyCart,
  createCart,
  retrieveCart,
} = require("../../controller/cart");

router.route("/").post(createCart);

router.route("/").get(retrieveCart);

router.route("/add").put(addCart);

router.route("/remove").put(removeCart);

router.route("/").delete(emptyCart);

module.exports = router;
