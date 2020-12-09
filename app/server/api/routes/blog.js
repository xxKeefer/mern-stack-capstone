const express = require("express");
let router = express.Router();
const auth = require("../../middleware/auth");
const {
  newBlog,
  getBlog,
  editBlog,
  deleteBlog,
  listBlogs,
} = require("../../controller/blog");

router.route("/new").post(auth.admin, newBlog);

router.route("/view/:_id").get(getBlog);

router.route("/edit/:_id").post(auth.admin, auth.blogOwner, editBlog);

router.route("/delete/:_id").delete(auth.admin, auth.blogOwner, deleteBlog);

router.route("/posts").get(listBlogs);

module.exports = router;
