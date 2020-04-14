const express = require("express");
const router = express.Router();
const Song = require("../models/Song");

router.get("/", (req, res) => {
  Song.find()
    .populate("instruments")
    .then((songs) => {
      res.json(songs);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Song.findById(id)
    .populate("instruments")
    .then((song) => {
      res.json(song);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/:title", (req, res) => {
  const { title } = req.body;
  Song.find({ title })
    .populate("instrument")
    .then((song) => {
      res.json(song);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  const { title, partition, instruments, tempo } = req.body;
  Song.create({ title, partition, instruments, tempo })
    .then((song) => {
      res.json(song);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
