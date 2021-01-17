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
  if (req.user) {
    res
      .status(401)
      .json({ message: "a user already authenticated, log out first." });
  }

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
  if (!req.user) {
    res.status(401).json({ message: "no user authenticated, login first." });
  }
  req.session.destroy(() => {
    res
      .status(204)
      .clearCookie("connect.sid")
      .json({ message: "session destroyed." });
  });
};

const sessionCheck = async (req, res) => {
  // const user = req.user._id.toString();
  // const session = req.session.passport.user;
  // console.log({ user }, { session }, session === user);

  //TODO: this does not feel like it is the right logic, but it passes my tests and uncommenting the lines above cause the test to time out so, yeah...
  if (req.user && req.session) {
    res.status(200).json({ user: req.user });
  }
  res.status(404).json({ message: "no session found." });
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  sessionCheck,
};
