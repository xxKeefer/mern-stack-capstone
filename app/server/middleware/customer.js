function hasShipping(req, res, next) {
  if (req.user.square_id) {
    return next();
  } else {
    res
      .status(404)
      .json({ message: "customer has no shipping details or does not exist." });
  }
}

function noShipping(req, res, next) {
  if (!req.user.square_id) {
    return next();
  } else {
    res.status(404).json({
      message: "customer already has shipping details, update instead.",
    });
  }
}

module.exports = { hasShipping, noShipping };
