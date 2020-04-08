// Seeds file that remove all users and create 2 new users
// To execute this seed, run from the root of the project
// $ node bin/seeds.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Song = require("../models/Song");
const Instrument = require("../models/Instrument");
const bcryptSalt = 10;
mongoose
  .connect("mongodb://localhost/boum-tchak", { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    username: "jeanjacques",
    password: bcrypt.hashSync("jeanjacques", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  },
];

let instruments = [
  {
    name: "Clap",
    colors: ["#ddd", "#7b7", "#7e7"],
    sounds: ["", "sounds/clap1.wav", "sounds/poc.wav"],
  },
  {
    name: "Snares",
    colors: ["#ddd", "#6f5", "#bfc"],
    sounds: ["", "sounds/snare1.wav", "sounds/snare2.wav"],
  },
  {
    name: "Kicks",
    colors: ["#ddd", "#baa", "#ecb"],
    sounds: ["", "sounds/kick1.wav", "sounds/kick2.wav"],
  },
  {
    name: "Hi-Hats",
    colors: ["#ddd", "#b75", "#da6", "#fb9"],
    sounds: ["", "sounds/hiHat1.wav", "sounds/hiHat2.wav", "sounds/hiHat3.wav"],
  },
  {
    name: "Vinyl",
    colors: ["#ddd", "#44a", "#55d", "#67f"],
    sounds: ["", "sounds/vinyl1.wav", "sounds/vinyl2.wav", "sounds/vinyl3.wav"],
  },
];

Instrument.deleteMany()
  .then(() => {
    return Instrument.create(instruments);
  })
  .then((instrumentsCreated) => {
    console.log(
      `${instrumentsCreated.length} instruments created with the following id:`
    );
    console.log(instrumentsCreated.map((u) => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });

const partitions = [
  [
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0],
    [1, 2, 3, 2, 0, 1, 2, 1],
  ],
  [
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 2, 0, 0, 1, 1],
  ],
  [
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 2, 0, 2, 0, 2, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 2, 0],
    [0, 0, 0, 2, 0, 1, 0, 1],
  ],
];

let songs = [
  {
    title: "Bipappalouda",
    partition: partitions[0],
    instruments: [""],
    tempo: 120,
  },
  {
    title: "Song 2",
    partition: partitions[1],
    instruments: [""],
    tempo: 120,
  },
  {
    title: "A Ballad",
    partition: partitions[2],
    instruments: [""],
    tempo: 120,
  },
];

// User.deleteMany()
//   .then(() => {
//     return User.create(users);
//   })
//   .then((usersCreated) => {
//     console.log(`${usersCreated.length} users created with the following id:`);
//     console.log(usersCreated.map((u) => u._id));
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect();
//   })
//   .catch((err) => {
//     mongoose.disconnect();
//     throw err;
//   });
