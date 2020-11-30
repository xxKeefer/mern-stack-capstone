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

module.exports = {
  user,
  admin,
  superAdmin,
};
