const square = require("../utils/shopController/squareUtils");
const Discogs = require("../utils/shopController/discogsUtils");
const Vinyl = require("../models/vinyl");

const addItem = async (req, res) => {
  const {
    release_id, // from Discogs
    price, // manual entry
    description, // manual entry, long form review
    review, // manual entry, summary review
  } = req.body;
  try {
    const data = await Discogs.getReleaseInfo(release_id);
    const {
      id,
      year,
      artists,
      artists_sort,
      title: release_title,
      released,
      genres,
      styles,
      tracklist,
      images,
    } = data;

    const item = await square.addItem(
      release_title,
      artists[0].name,
      genres,
      styles,
      price
    );

    const newVinyl = await Vinyl.create({
      discogs_id: id,
      square_id: item.catalog_object.id,
      release_title,
      artists_sort,
      artists: artists.map((a) => a.name),
      track_list: tracklist,
      genres,
      styles,
      image: images[0].uri,
      variations: {
        stock: {
          variation_id: item.catalog_object.item_data.variations[0].id,
          price,
        },
      },
      release_date: released,
      year,
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
