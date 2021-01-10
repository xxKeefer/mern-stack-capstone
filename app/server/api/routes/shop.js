const express = require("express");
let router = express.Router();
//TODO: add authorisation on these routes
const {
  addItem,
  addItems,
  getMongoCatalog,
  listItems,
  listItem,
  deleteItem,
  deleteItems,
  getStockCount,
  setStockCount,
  sendCompactDB,
} = require("../../controller/shop");

router.route("/add").post(addItem);

router.route("/add-multi").post(addItems);

router.route("/list").get(getMongoCatalog);

router.route("/list-subset").get(listItems);

router.route("/list-one").get(listItem);

router.route("/search").get(sendCompactDB);

router.route("/delete").delete(deleteItem);

router.route("/delete-multi").delete(deleteItems);

router.route("/item-count").get(getStockCount);

router.route("/item-stock-in").post(setStockCount);

module.exports = router;
