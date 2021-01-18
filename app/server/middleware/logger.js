function route(req, res, next) {
  if (process.env.NODE_ENV !== "test") console.log("ROUTE :: ", req.url);
  return next();
}

module.exports = { route };
