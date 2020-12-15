require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const axios = require("axios").default;

//HELPERS
const SQUARE_API_CONFIG = {
  baseURL: "https://connect.squareupsandbox.com/v2",
  headers: {
    "Square-Version": "2020-05-28",
    Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
};

const abbreviate = (release_title, artist, year) => {
  const abr1 = release_title.slice(0, 3).toUpperCase();
  const abr2 = artist.slice(0, 3).toUpperCase();
  return abr1 + abr2 + year;
};

const describe = (release_title, artist, genres, styles) => {
  const arrayStringifier = (arr) => {
    if (arr.length < 2) return arr[0];
    return arr.join(", ");
  };
  const aS = arrayStringifier;
  return `${release_title} - ${artist} | Genres: ${aS(genres)} | Styles: ${aS(
    styles
  )}`;
};

const buildVariation = (type, release_title, artist, price) => {
  return {
    id: `#${type}::${uuidv4()}`,
    type: "ITEM_VARIATION",
    item_variation_data: {
      item_id: `#${release_title}_${artist}`,
      name: type.toUpperCase(),
      price_money: {
        amount: price,
        currency: "AUD",
      },
      pricing_type: "FIXED_PRICING",
      track_inventory: true,
    },
  };
};

//EXPORTS -- CATALOG
const addItem = async (release_title, artist, genres, styles, price) => {
  const item = await axios.post(
    "/catalog/object",
    {
      idempotency_key: uuidv4(),
      object: {
        id: `#${release_title}_${artist}`,
        type: "ITEM",
        item_data: {
          available_electronically: true,
          available_for_pickup: true,
          available_online: true,
          product_type: "REGULAR",
          skip_modifier_screen: true,
          abbreviation: abbreviate(release_title, artist),
          description: describe(release_title, artist, genres, styles),
          name: `${release_title} - ${artist}`,
          variations: [buildVariation("stock", release_title, artist, price)],
        },
      },
    },
    SQUARE_API_CONFIG
  );
  return item.data;
};

const addItems = async (itemInfoArray) => {
  // check to make sure rate limit isn't surpassed
  if (itemInfoArray.length > 1000)
    return new Error("Tried to upsert more than 1000 items.");

  let batch = [];
  itemInfoArray.forEach((item) => {
    const { release_title, artist, genres, styles, price } = item;
    batch.push({
      id: `#${release_title}_${artist}`,
      type: "ITEM",
      item_data: {
        available_electronically: true,
        available_for_pickup: true,
        available_online: true,
        product_type: "REGULAR",
        skip_modifier_screen: true,
        abbreviation: abbreviate(release_title, artist),
        description: describe(release_title, artist, genres, styles),
        name: `${release_title} - ${artist}`,
        variations: [buildVariation("stock", release_title, artist, price)],
      },
    });
  });

  const batchUpsert = await axios.post(
    "/catalog/batch-upsert",
    {
      idempotency_key: uuidv4(),
      batches: [{ objects: batch }],
    },
    SQUARE_API_CONFIG
  );

  return batchUpsert.data;
};

const deleteItems = async (squareIdsArray) => {
  const deleteLog = await axios.post(
    "/catalog/batch-delete",
    {
      object_ids: squareIdsArray,
    },
    SQUARE_API_CONFIG
  );
  return deleteLog.data;
};

const deleteItem = async (squareId) => {
  const deleteLog = await axios.delete(
    `/catalog/object/${squareId}`,
    SQUARE_API_CONFIG
  );
  return deleteLog.data;
};

const getCatalog = async (type = "item") => {
  const list = await axios.get(
    `/catalog/list?types=${type}`,
    SQUARE_API_CONFIG
  );

  const ids = list.data.objects.map((item) => item.id);

  return { ids: ids, detailed: list.data };
};

const getItem = async (squareId) => {
  const item = await axios.get(
    `/catalog/object/${squareId}`,
    SQUARE_API_CONFIG
  );
  return item.data;
};

const getItems = async (squareIdsArray) => {
  const items = await axios.post(
    "/catalog/batch-retrieve",
    {
      object_ids: squareIdsArray,
      include_related_objects: true,
    },
    SQUARE_API_CONFIG
  );
  return items.data;
};

//EXPORTS -- INVENTORY

module.exports = {
  addItem,
  addItems,
  deleteItems,
  deleteItem,
  getCatalog,
  getItem,
  getItems,
};
