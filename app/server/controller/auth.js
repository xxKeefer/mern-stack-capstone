const User = require("../models/user");
const passport = require("passport");

//MODEL & SESSION FUNCTIONS
const createUser = async (req, res, next) => {
  const handleNewUser = (user) => {
    req.login(user, (err) => {
      if (err) {
        next(err);
      } else {
        res.status(201).json(user);
      }
    });
  };

  const { username, email, password } = req.body;
  try {
    // check to see if username or email has been taken
    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!userExists) {
      const user = await User.create({ username, email, password });
      handleNewUser(user);
    } else {
      throw new Error("user already exists.");
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
};

const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "session destroyed." });
  });
};

const sessionCheck = async (req, res) => {
  if (req.user) {
    res.status(200).json({ _id: req.user._id });
  } else {
    res.status(200).json({ _id: null });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  sessionCheck,
};
