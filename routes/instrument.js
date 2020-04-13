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

// builds a basic drumkit at the start of the app
router.get("/starter", (req, res) => {
  Instrument.find({ name: { $in: ["Kicks", "Snares", "Hi-Hats", "Clap"] } })
    .then((instruments) => {
      res.json(instruments);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Instrument.findById(id)
    .then((instrument) => {
      comsole.log("the response:", instrument);
      res.json(instrument);
    })
    .catch((e) => {
      res.json(e);
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
