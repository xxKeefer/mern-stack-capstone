const Blog = require("../models/blog");

function user(req, res, next) {
  if (req.user) {
    return next();
  } else {
    res.status(403).json({ message: "You are not authorized to see that." });
  }
}

function admin(req, res, next) {
  if (req.user && req.user.roles.includes("admin")) {
    return next();
  } else {
    res.status(403).json({ message: "You are not authorized to see that." });
  }
}

function superAdmin(req, res, next) {
  if (req.user && req.user.roles.includes("super")) {
    return next();
  } else {
    res.status(403).json({ message: "You are not authorized to see that." });
  }
}

async function blogOwner(req, res, next) {
  const { _id } = req.params;
  const blog = await Blog.findOne({ _id });

  if (!blog) res.status(404).json({ messsage: "blog does not exist" });

  if (req.user.username === blog.author.toLowerCase()) {
    return next();
  } else {
    res.status(403).json({ message: "You are not authorized to see that." });
  }
}

module.exports = {
  user,
  admin,
  superAdmin,
  blogOwner,
};
