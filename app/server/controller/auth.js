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
    } else if (userExists.username === username) {
      res.status(400).send({
        formError: {
          type: "manual",
          name: "username",
          message: "username is taken.",
        },
      });
    } else if (userExists.email === email) {
      res.status(400).send({
        formError: {
          type: "manual",
          name: "email",
          message: "email is taken.",
        },
      });
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
      return res.status(404).send({
        formError: {
          type: "manual",
          name: "email",
          message: "username or password incorrect.",
        },
      });
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
    res
      .status(200)
      .clearCookie("connect.sid")
      .json({ message: "session destroyed." });
  });
};

const sessionCheck = async (req, res) => {
  if (req.user) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(200).json({ user: req.user });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  sessionCheck,
};
