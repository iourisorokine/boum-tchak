const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const allSongs = await Song.find().populate("instruments");
    if (allSongs) {
      res.json(allSongs);
    }
  } catch (error) {
    res.json(err);
  }
});

router.get("/creator/:creatorId", async (req, res) => {
  const { creatorId } = req.params;
  try {
    const songs = await Song.find({ creator: creatorId }).populate(
      "instruments"
    );
    if (songs) {
      res.json(songs);
    }
  } catch (error) {
    res.json(err);
  }
});

router.get("/posted/:page", async (req, res) => {
  const { page } = req.params;
  const lengthOfPage = 5;
  const firstIndex = (page - 1) * lengthOfPage;
  const lastIndex = page * lengthOfPage;
  console.log('Searching for songs');
  try {
    const songs = await Song.find({ posted: true })
      .sort({created_at: -1})
      .limit(lastIndex)
      .skip(firstIndex)
      .populate("instruments");

    if(!songs || !songs.length){
      console.log('no soungs found')
    }
    if (songs) {
      res.json(songs);
    }
  } catch (error) {
    console.log('Ae error occured when fetching the songs: ', error)
    res.json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findById(id).populate("instruments");
    if (song) {
      res.json(song);
    }
  } catch (error) {
    res.json(error);
  }
});

router.get("/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const song = await Song.find({ title }).populate("instrument");
    if (song) {
      res.json(song);
    }
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    partition,
    instruments,
    tempo,
    creator,
    creatorName,
    posted,
  } = req.body;
  try {
    const newSong = await Song.create({
      title,
      partition,
      instruments,
      tempo,
      creator,
      creatorName,
      posted,
    });
    if (creator) {
      await updateUserSongs(creator, newSong._id);
    }
    res.json(newSong);
  } catch (error) {
    res.json(error);
  }
});

const updateUserSongs = async (userId, songId) => {
  try {
    const user = await User.findById(userId);
    const updatedSongs = user.songs.concat([songId]);
    await User.findByIdAndUpdate(
      userId,
      { songs: updatedSongs },
      { new: true }
    );
  } catch (error) {
    res.json(error);
  }
};

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Song.findByIdAndDelete(id);
    res.json({ message: "The song was deleted with success" });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
