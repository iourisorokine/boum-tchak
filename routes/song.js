const express = require("express");
const router = express.Router();
const Song = require("../models/Song");

router.get("/:title", (req, res) => {
  Song.find({ title })
    .then((song) => {
      res.json(song);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  const { title, partition, instruments, tempo } = req.body;
  console.log("req params:", req.body);
  Song.create({ title, partition, instruments, tempo })
    .then((song) => {
      res.json(song);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
