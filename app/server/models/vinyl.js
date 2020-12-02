const mongoose = require("mongoose");

const vinylSchema = new mongoose.Schema({
  square_id: { type: String, required: true },
  release_title: { type: String, required: true },
  artists: { type: Array, required: true },
  track_list: { type: Array, required: true },
  format: { type: String, required: true },
  label: { type: String, required: true },
  catalog_number: { type: String, required: false },
  release_date: { type: String, required: false },
  description: { type: String, required: false },
  review: { type: String, required: false },
});

module.exports = mongoose.model("Vinyl", vinylSchema);
