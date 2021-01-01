const square = require("../utils/shopController/squareUtils");
const Discogs = require("../utils/shopController/discogsUtils");
const Vinyl = require("../models/vinyl");

const addItem = async (req, res) => {
  const {
    release_id, // from Discogs
    price, // manual entry
    description, // manual entry, long form review
    review, // manual entry, summary review
    preloved = false,
  } = req.body;
  try {
    const data = await Discogs.getReleaseInfo(release_id);
    const {
      id,
      year,
      artists,
      artists_sort,
      title: release_title,
      released: release_date,
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
      tracklist,
      genres,
      styles,
      image: images[0].uri,
      variations: {
        stock: {
          variation_id: item.catalog_object.item_data.variations[0].id,
          price,
        },
      },
      release_date,
      year,
      description,
      review,
      preloved,
    });

    res.status(201).json(newVinyl);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const addItems = async (req, res, next) => {
  const { upload_items: batchArray } = req.body;
  try {
    const processedByDiscogs = await Discogs.batchGetInfo(batchArray);

    const uploadedItems = await square.addItems(processedByDiscogs);

    // bind square_id to items processed by discogs and make data fit model
    const completedBatch = [...processedByDiscogs];
    completedBatch.map((item, i) => {
      item.square_id = uploadedItems.objects[i].id;
      item.discogs_id = item.id;
      item.image = item.images[0].uri;
      item.variations = {
        stock: {
          variation_id: uploadedItems.objects[i].item_data.variations[0].id,
          price: item.price,
        },
      };
    });

    const newVinyls = await Vinyl.insertMany(completedBatch);

    res.status(201).json(newVinyls);
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

const deleteItem = async (req, res) => {
  try {
    const deleted = await square.deleteItem(req.body.item);
    const deletedVinyl = await Vinyl.findOneAndDelete({
      square_id: req.body.item,
    });
    res.status(200).json({ deleted, deletedVinyl });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const deleteItems = async (req, res, next) => {
  try {
    const deleted = await square.deleteItems(req.body.items);
    const deletedVinyls = await Vinyl.deleteMany({
      square_id: {
        $in: req.body.items,
      },
    });
    res.status(200).json({ deleted, deletedVinyls });
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
  deleteItem,
  deleteItems,
};
