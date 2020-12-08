const express = require("express");
let router = express.Router();
const {
  addItem,
  addItems,
  getSquareCatalog,
  listItems,
  listItem,
  deleteSquareItem,
  deleteSquareItems,
} = require("../../controller/shop");

router.route("/add").post(addItem);

router.route("/add-multi").post(addItems);

router.route("/list").get(getSquareCatalog);

router.route("/list-subset").get(listItems);

router.route("/list-one").get(listItem);

router.route("/delete").post(deleteSquareItem);

router.route("/delete-multi").post(deleteSquareItems);

module.exports = router;
