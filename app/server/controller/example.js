//RENDER FUNCTIONS
const examplePublic = (req, res) => {
  res.status(200).json({ message: "You hit the public route." });
};

const examplePrivate = (req, res) => {
  res.status(200).json({ message: "You hit the private route." });
};

const exampleAdmin = (req, res) => {
  res.status(200).json({ message: "You hit the admin route." });
};

const exampleSuper = (req, res) => {
  res.status(200).json({ message: "You hit the super route." });
};

const showSession = (req, res) => {
  res.status(200).json({ user: req.user, session: req.session });
};

module.exports = {
  examplePublic,
  examplePrivate,
  exampleAdmin,
  exampleSuper,
  showSession,
};
