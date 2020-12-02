const square = require("../utils/shopController/squareUtils");
const Vinyl = require("../models/vinyl");

const addItem = async (req, res, next) => {
  const {
    release_title,
    artists,
    track_list,
    format,
    label,
    preloved,
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
      preloved
    );

    const newVinyl = await Vinyl.create({
      square_id: item.catalog_object.id,
      release_title,
      artists,
      track_list,
      format,
      label,
      preloved,
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

const getSquareCatalog = async (req, res, next) => {
  const type = "item";
  try {
    const catalogList = await square.listItems(type);

    res.status(200).json(catalogList);
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
  getSquareCatalog,
  deleteSquareItem,
  deleteSquareItems,
};
