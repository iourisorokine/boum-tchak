const express = require("express");
const router = express.Router();
const User = require("../models/User");

// const uploader = require("../configs/cloudinary");

router.post("/", (req, res) => {
  const username = req.body.username;

  User.create({
    username: username,
    admin: false,
    songs: [],
    customInstruments: [],
  })
    .then((user) => {
      req.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.patch("/update", (req, res) => {
  const { username } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { username }, { new: true })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
