const express = require("express");
const router = express.Router();
const Sound = require("../models/Sound");

router.get("/", async (req, res) => {
  try {
    const allSounds = await Sound.find();
    if (allSounds) {
      res.json(allSounds);
    }
  } catch (error) {
    res.json(err);
  }
});

router.get("/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const sounds = await Sound.find({category});
    if (sounds) {
      res.json(sounds);
    }
  } catch (error) {
    res.json(err);
  }
});

module.exports = router;
