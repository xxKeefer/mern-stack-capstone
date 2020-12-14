const mongoose = require("mongoose");

const vinylSchema = new mongoose.Schema({
  discogs_id: { type: Number, required: true },
  square_id: { type: String, required: true },
  release_title: { type: String, required: true },
  artists_sort: { type: String, required: true },
  artists: { type: Array, required: true },
  track_list: { type: Array, required: true },
  genres: { type: Array, required: true },
  styles: { type: Array, required: true },
  image: { type: String, required: true },
  variations: {
    stock: {
      variation_id: { type: String, required: true },
      price: { type: Number, required: true },
    },
  },
  catalog_number: { type: String, required: false },
  format: { type: String, required: false },
  label: { type: String, required: false },
  release_date: { type: String, required: false },
  year: { type: String, required: false },
  description: { type: String, required: false },
  review: { type: String, required: false },
});

module.exports = mongoose.model("Vinyl", vinylSchema);
