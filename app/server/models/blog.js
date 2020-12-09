const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    byline: { type: String, required: false },
    body: { type: String, required: true },
    author: { type: String, required: true },
    image_url: { type: String, required: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Blog", blogSchema);
