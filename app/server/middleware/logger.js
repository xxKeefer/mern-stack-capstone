function route(req, res, next) {
  console.log("ROUTE :: ", req.url);
  return next();
}

module.exports = { route };
