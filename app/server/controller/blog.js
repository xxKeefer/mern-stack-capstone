const Blog = require("../models/blog");
const { cloudinary } = require("../utils/cloudinaryConfig");

//HELPERS

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//EXPORTS

const newBlog = async (req, res, next) => {
  const { title, byline, body, image_str: imageStr } = req.body;
  const author = capitalize(req.user.username);
  const blogObj = { title, byline, body, author };

  try {
    if (imageStr) {
      const imgResp = await cloudinary.uploader.upload(imageStr, {
        upload_preset: "dogolat",
      });
      blogObj.image_url = imgResp.secure_url;
    }
  } catch (e) {
    console.log(e.message);

    res.status(500).json({ message: "image upload failed" });
  }

  try {
    const newBlog = await Blog.create(blogObj);
    res.status(201).json(newBlog);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const getBlog = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const blog = await Blog.find({ _id });
    res.status(201).json(blog);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const editBlog = async (req, res, next) => {
  const { _id } = req.params;
  const { title, byline, body } = req.body;

  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id },
      { $set: { title, byline, body } }
    );
    res.status(200).json(updatedBlog);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const deleteBlog = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const deletedBlog = await Blog.findOneAndDelete({ _id });
    res.status(200).json(deletedBlog);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const listBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(202).json(blogs);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports = {
  newBlog,
  getBlog,
  editBlog,
  deleteBlog,
  listBlogs,
};
