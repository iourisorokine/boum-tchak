const express = require("express");
const router = express.Router();
const Instrument = require("../models/Instrument");

/* GET home page */
router.get("/", (req, res, next) => {
  Instrument.find()
    .then((instruments) => {
      res.json(instruments);
    })
    .catch((e) => {
      res.json(e);
    });
});

router.get("/:name", (req, res) => {
  const name = req.params.name;
  Instrument.findByOne({ name })
    .then((instrument) => {
      res.json(instrument);
    })
    .catch((e) => {
      res.json(e);
    });
});

module.exports = router;
