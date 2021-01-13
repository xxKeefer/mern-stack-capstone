const express = require("express");
let router = express.Router();
//THIS ROUTE HANDLES CUSTOMER DATA, INCLUDING SHIPPING AND CARD DETAILS

const {
  createCx,
  updateCx,
  deleteCx,
  retrieveCx,
  addCardPayment,
  removeCardPayment,
} = require("../../controller/customer");

router.route("/").post(createCx);

router.route("/").put(updateCx);

router.route("/").delete(deleteCx);

router.route("/:id").get(retrieveCx);

router.route("/card").post(addCardPayment);

router.route("/card").delete(removeCardPayment);

module.exports = router;
