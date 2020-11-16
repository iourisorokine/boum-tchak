const express = require("express");
const router = express.Router();
const Instrument = require("../models/Instrument");

router.get("/", async (req, res) => {
  const { category } = req.query || null;
  try {
    const instruments = category
      ? await Instrument.find({ category })
      : await Instrument.find();
    if (!instruments) {
      throw new Error({ message: "could not find any instruments" });
    }
    const reversedIntruments = instruments.reverse();
    res.json(reversedIntruments);
  } catch (error) {
    res.json(error);
  }
});

// builds a basic drumkit at the start of the app
router.get("/starter", async (req, res) => {
  console.log('Fetching the instruments')
  try {
    const starterInstruments = await Instrument.find({
      name: { $in: ["Kicks 1", "Snares 1", "Clap 1"] },
    });
    if (!starterInstruments || !starterInstruments.length) {
      throw new Error({ message: "could not find any instruments" });
    }
    res.json(starterInstruments);
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const instrument = await Instrument.findById(id);
    if (!instrument) {
      throw new Error({ message: "instrument not found" });
    }
    res.json(instrument);
  } catch (error) {
    res.json(error);
  }
});

router.get("/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const instrument = await Instrument.find({ name });
    if (!instrument) {
      throw new Error({ message: "instrument not found" });
    }
    res.json(instrument);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    category,
    subCategory,
    sounds,
    creator,
    private,
  } = req.body;
  const foundSameName = await Instrument.findOne({ name });
  if (foundSameName) {
    res.json({
      message:
        "An instrument with the same name already exists, please create a unique name",
    });
  }
  if(sounds.length<2){
    res.json({
      message: "An instrument should contain at least one playable sound",
    })
  }
  if(!name||!category||!subCategory){
    res.json({
      message: "One or several fields are missing",
    })
  }
  try {
    const newInstrument = await Instrument.create({
      name,
      category,
      subCategory,
      sounds,
      creator,
      private,
    });
    if (creator) {
      await updateUserInstruments(creator, newInstrument._id);
    }
    res.json(newInstrument);
  } catch (error) {
    res.json(error);
  }
});

const updateUserInstruments = async (userId, instrumentId) => {
  try {
    const user = await User.findById(userId);
    const updatedInstruments = user.customInstruments.concat([instrumentId]);
    await User.findByIdAndUpdate(
      userId,
      { songs: updatedInstruments },
      { new: true }
    );
  } catch (error) {
    res.json(error);
  }
};

module.exports = router;
