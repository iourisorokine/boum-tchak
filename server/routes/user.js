const express = require("express");
const router = express.Router();
const User = require("../models/User");

// specs of cloudinary in case of need for profile pics later
// const uploader = require("../configs/cloudinary");

router.post("/", async (req, res) => {
  const { username } = req.body;
  try {
    const newUser = await User.create({
      username: username,
      admin: false,
      songs: [],
      customInstruments: [],
    });
    req.json(newUser);
  } catch (error) {
    res.json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    res.json(err);
  }
});

router.patch("/update", async (req, res) => {
  const { username } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { username },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
