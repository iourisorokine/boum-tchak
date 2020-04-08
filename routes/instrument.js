const express = require("express");
const router = express.Router();
const Instrument = require("../models/Instrument");

router.get("/", (req, res) => {
  Instrument.find()
    .then((instruments) => {
      res.json(instruments);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/starter", (req, res) => {
  Instrument.find({ name: { $in: ["Kicks", "Snares", "Hi-Hats", "Clap"] } })
    .then((instruments) => {
      res.json(instruments);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/:name", (req, res) => {
  const name = req.params.name;
  Instrument.find({ name })
    .then((instrument) => {
      res.json(instrument);
    })
    .catch((e) => {
      res.json(e);
    });
});

module.exports = router;
