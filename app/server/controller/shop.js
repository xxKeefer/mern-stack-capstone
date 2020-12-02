const { v4: uuidv4 } = require("uuid");
const { SQUARE_API_CONFIG } = require("../utils/squareApi");
const { abbreviate, describe } = require("../utils/shopController/utils");
const Vinyl = require("../models/vinyl");
const axios = require("axios").default;
require("../utils/squareApi");

const addItem = async (req, res, next) => {
  const {
    release_title,
    artists,
    track_list,
    format,
    label,
    catalog_number,
    release_date,
    description,
    review,
  } = req.body;
  try {
    const item = await axios.post(
      "/catalog/object",
      {
        idempotency_key: uuidv4(),
        object: {
          id: `#${release_title}_${artists[0]}`,
          type: "ITEM",
          item_data: {
            abbreviation: abbreviate(release_title, artists),
            description: describe(release_title, artists, format, label),
            name: `${release_title} ${artists[0]}`,
          },
        },
      },
      SQUARE_API_CONFIG
    );
    console.log(item.data);

    const newVinyl = await Vinyl.create({
      square_id: item.data.catalog_object.id,
      release_title,
      artists,
      track_list,
      format,
      label,
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

module.exports = { addItem };
