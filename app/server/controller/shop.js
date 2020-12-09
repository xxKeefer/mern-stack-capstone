const square = require("../utils/shopController/squareUtils");
const Vinyl = require("../models/vinyl");

const addItem = async (req, res, next) => {
  const {
    release_title,
    artists,
    track_list,
    format,
    label,
    price,
    catalog_number,
    release_date,
    description,
    review,
  } = req.body;
  try {
    const item = await square.addItem(
      release_title,
      artists,
      format,
      label,
      price
    );

    const newVinyl = await Vinyl.create({
      square_id: item.catalog_object.id,
      release_title,
      artists,
      track_list,
      format,
      label,
      variations: {
        sealed: {
          variation_id: item.catalog_object.item_data.variations[0].id,
          price,
        },
        preloved: {
          variation_id: item.catalog_object.item_data.variations[1].id,
          price,
        },
      },
      catalog_number,
      release_date,
      description,
      review,
    });

    res.status(201).json(newVinyl);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const addItems = async (req, res, next) => {
  const { upload_items: itemInfoArray } = req.body;
  try {
    const uploadedItems = await square.addItems(itemInfoArray);

    let uploadedVinyls = [];

    res.status(201).json(uploadedItems);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const getSquareCatalog = async (req, res, next) => {
  const type = "item";
  try {
    const catalogList = await square.getCatalog(type);

    res.status(200).json(catalogList);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const listItem = async (req, res, next) => {
  const { square_id: squareId } = req.body;
  try {
    const item = await square.getItem(squareId);
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const listItems = async (req, res, next) => {
  const { square_ids: squareIdsArray } = req.body;
  try {
    const item = await square.getItems(squareIdsArray);
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const deleteSquareItem = async (req, res, next) => {
  try {
    const deleted = await square.deleteItem(req.body.item);
    res.status(200).json(deleted);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const deleteSquareItems = async (req, res, next) => {
  try {
    const deleted = await square.deleteItems(req.body.items);
    res.status(200).json(deleted);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports = {
  addItem,
  addItems,
  getSquareCatalog,
  listItem,
  listItems,
  deleteSquareItem,
  deleteSquareItems,
};
