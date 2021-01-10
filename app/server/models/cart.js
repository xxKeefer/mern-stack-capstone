const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: false },
  square_id: { type: String, required: false },
  line_items: { type: Array, required: true, default: [] },
});

module.exports = mongoose.model("Cart", userSchema);
