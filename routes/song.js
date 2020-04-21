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

router.get("/posted/:page", async (req, res) => {
  const {page} = req.params;
  const limit = 3;
  try {
    const songs = await Song.find({ posted: true }).populate("instruments");
    if (songs) {
      const firstIndex = (page - 1) * limit;
      const lastIndex = page * limit;
      const response = songs.slice(firstIndex, lastIndex);
      res.json(response);
    }
  } catch (error) {
    res.json(error);
  }
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
  const { title, partition, instruments, tempo, creator, posted } = req.body;
  Song.create({ title, partition, instruments, tempo, creator, posted })
    .then((song) => {
      res.json(song);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Song.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "The song was deleted with success" });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
