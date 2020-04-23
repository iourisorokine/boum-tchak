const express = require("express");
const router = express.Router();
const Instrument = require("../models/Instrument");

router.get("/", async (req, res) => {
  try {
    const instruments = await Instrument.find();
    if (!instruments) {
      throw new Error({ message: "could not find any instruments" });
    }
    res.json(instruments);
  } catch (error) {
    res.json(error);
  }
});

// builds a basic drumkit at the start of the app
router.get("/starter", async (req, res) => {
  try {
    const starterInstruments = await Instrument.find({
      name: { $in: ["Kicks", "Snares", "Hi-Hats", "Clap"] },
    });
    if (!starterInstruments) {
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

module.exports = router;
