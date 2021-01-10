if (process.env.NODE_ENV !== "production") require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const axios = require("axios").default;
const { SQUARE_API_CONFIG } = require("../squareConfig");

//HELPERS -- CATALOG
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

const buildVariation = (type, idRef, price) => {
  return {
    id: `#${type}::${uuidv4()}`,
    type: "ITEM_VARIATION",
    item_variation_data: {
      item_id: idRef,
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
const addItem = async (release_title, artist, genres, styles, price, year) => {
  const catalogId = `#${release_title}_${artist}::${uuidv4()}`;

  const item = await axios.post(
    "/catalog/object",
    {
      idempotency_key: uuidv4(),
      object: {
        id: catalogId,
        type: "ITEM",
        item_data: {
          available_electronically: true,
          available_for_pickup: true,
          available_online: true,
          product_type: "REGULAR",
          skip_modifier_screen: true,
          abbreviation: abbreviate(release_title, artist, year),
          description: describe(release_title, artist, genres, styles),
          name: `${release_title} - ${artist}`,
          variations: [buildVariation("stock", catalogId, price)],
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
    const {
      release_title,
      artists_sort: artist,
      genres,
      styles,
      price,
      year,
    } = item;

    //in batch upserts the id needs to be unique and also match in the variation reference
    let catalogId = `#${release_title}_${artist}::${uuidv4()}`;

    batch.push({
      id: catalogId,
      type: "ITEM",
      item_data: {
        available_electronically: true,
        available_for_pickup: true,
        available_online: true,
        product_type: "REGULAR",
        skip_modifier_screen: true,
        abbreviation: abbreviate(release_title, artist, year),
        description: describe(release_title, artist, genres, styles),
        name: `${release_title} - ${artist}`,
        variations: [buildVariation("stock", catalogId, price)],
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
  // console.log(batchUpsert.data);

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

  if (list.data.objects) {
    const ids = list.data.objects.map((item) => item.id);
    return { ids: ids, detailed: list.data };
  } else {
    return { ids: [], detailed: {} };
  }
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

//HELPERS -- INVENTORY

// right now there is only one location
const LOC_ID = "LWB7HW6Z45KS9";

//EXPORTS -- INVENTORY

const getStockCount = async (SqVariationId, locId = LOC_ID) => {
  const count = await axios.get(
    `/inventory/${SqVariationId}?location_ids=${locId}`,
    SQUARE_API_CONFIG
  );

  return count.data;
};

const setStockCount = async (counts, locId = LOC_ID) => {
  const changes = [];

  counts.forEach((count) => {
    changes.push({
      type: "PHYSICAL_COUNT",
      physical_count: {
        catalog_object_id: count.variation_id,
        state: "IN_STOCK",
        location_id: locId,
        quantity: count.qty.toString(),
        occurred_at: new Date(Date.now()).toISOString(),
      },
    });
  });

  const count = await axios.post(
    "/inventory/batch-change",
    {
      idempotency_key: uuidv4(),
      changes: changes,
      ignore_unchanged_counts: true,
    },
    SQUARE_API_CONFIG
  );

  console.log(count.data);

  return count.data;
};

module.exports = {
  addItem,
  addItems,
  deleteItems,
  deleteItem,
  getCatalog,
  getItem,
  getItems,
  getStockCount,
  setStockCount,
};
