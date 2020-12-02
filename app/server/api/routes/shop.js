const express = require("express");
let router = express.Router();
const {
  addItem,
  getSquareCatalog,
  deleteSquareItem,
  deleteSquareItems,
} = require("../../controller/shop");

router.route("/add").post(addItem);

router.route("/list").get(getSquareCatalog);

router.route("/delete").post(deleteSquareItem);

router.route("/delete-multi").post(deleteSquareItems);

module.exports = router;
