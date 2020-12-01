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

module.exports = { examplePublic, examplePrivate, exampleAdmin, exampleSuper };
