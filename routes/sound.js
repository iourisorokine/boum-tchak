const express = require("express");
const router = express.Router();
const Sound = require("../models/Sound");
const uploader = require("../configs/cloudinary");

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
    const sounds = await Sound.find({ category });
    if (sounds) {
      res.json(sounds);
    }
  } catch (error) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const { name, category, subCategory, pitch, url } = req.body;
  console.log(req.body);
  const pitchInfo = pitch || "";
  try {
    const newSound = await Sound.create({
      name,
      category,
      subCategory,
      pitch: pitchInfo,
      url,
    });
    res.json(newSound);
  } catch (error) {
    res.json(error);
  }
});

router.post("/upload", uploader.single("sounds"), (req, res, next) => {
  console.log("##### req file", req.file);
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
});

module.exports = router;
