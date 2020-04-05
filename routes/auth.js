const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// POST api/auth/signup
router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Your password must be 8 char. min." });
  }
  if (!username) {
    return res.status(400).json({ message: "Your email cannot be empty" });
  }

  User.findOne({ username: username })
    .then((found) => {
      if (found) {
        return res.status(400).json({ message: "This email is already taken" });
      }

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      return User.create({ username: username, password: hash }).then(
        (dbUser) => {
          req.login(dbUser, (err) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "error while creating user" });
            }
          });
          res.json(dbUser);
        }
      );
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    req.login(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error while attempting to login" });
      }
      return res.json(user);
    });
  })(req, res);
});

// Facebook Authentification Route

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "https://gem-box.herokuapp.com/profile", //check if dynamic possible
    failureRedirect: "https://gem-box.herokuapp.com/login"
  })
);

// Google Authentification Route

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://gem-box.herokuapp.com/login"
  }),
  function(req, res) {
    res.redirect("https://gem-box.herokuapp.com/profile");
  }
);

// DELETE /api/auth/logout
router.delete("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Successful logout" });
});

//check if the user has an active session
router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

module.exports = router;
