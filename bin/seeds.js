// Seeds file that remove all users and create 2 new users
// To execute this seed, run from the root of the project
// $ node bin/seeds.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Wisdom = require("../models/Wisdom");
const Gem = require("../models/Gem");
const bcryptSalt = 10;
mongoose
  .connect("mongodb://localhost/gembox-database", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
let users = [
  {
    username: "alice",
    travelInterests: "Biking",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "bob",
    travelInterests: "Mountaining",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt))
  }
];

let wisdoms = [
  {
    author: "Samuel Johnson",
    quote:
      "All travel has its advantages. If the passenger visits better countries, he may learn to improve his own. And if fortune carries him to worse, he may learn to enjoy it"
  },
  {
    author: "Frank Herbert",
    quote:
      "Without new experiences, something inside of us sleeps. The sleeper must awaken."
  },
  {
    author: "Samuel Johnson",
    quote:
      "he use of traveling is to regulate imagination by reality, and instead of thinking how things may be, to see them as they are."
  },
  {
    author: "Henry David Thoreau",
    quote:
      "The man who goes alone can start today, but he who travels with another must wait till that other is ready."
  },
  {
    author: "Lawrence Block",
    quote:
      "Our happiest moments as tourists always seem to come when we stumble upon one thing while in pursuit of something else."
  },
  {
    author: "Samuel Johnson",
    quote:
      "he use of traveling is to regulate imagination by reality, and instead of thinking how things may be, to see them as they are."
  },
  {
    author: "Martin Buber",
    quote:
      "All journeys have secret destinations of which the traveler is unaware."
  },
  {
    quote:
      "I would have wound up a little ignorant white Southern female, which was not my idea of a good life.",
    author: "Lauren Hutton"
  },
  {
    author: "Milton Glaser",
    quote: "Travel penetrates your consciousness, but not in a rational way."
  },
  {
    author: "Helen Keller",
    quote: "Life is either a daring adventure or nothing."
  },
  {
    author: "René Descartes",
    quote: "Traveling is almost like talking with men of other centuries."
  },
  {
    author: "Henry Miller",
    quote: "One's destination is never a place, but a new way of seeing things."
  },
  {
    author: "Caskie Stinnett",
    quote: "I travel a lot; I hate having my life disrupted by routine."
  }
];
let gems = [
  // example 1
  {
    title: "Niagara Waterfall",
    description: "we captured this amazing picture of the world famous marvel",
    goodToKnow: "water is cold",
    imageUrl:
      "https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
    discovery: true,
    category: "nature",
    visitedDate: "",
    latitude: 59.913868,
    longitude: 10.752245,
    locationName:
      "7311 Porter Road, Niagara Falls, New York 14304, United States",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },
  // example 2
  {
    title: "This super spot",
    description: "That's a very cool spot, we just ca't believe that",
    goodToKnow: "Spot spot spot",
    imageUrl:
      "https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
    discovery: true,
    category: "nature",
    visitedDate: "",
    latitude: 39.758602,
    longitude: -104.997437,
    locationName:
      "Amante Coffee, 1612 17th St, Denver, Colorado 80202, United States",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },
  // example 3
  {
    title: "Hiking in the Mountains",
    description: "That's a very cool spot, we just ca't believe that",
    goodToKnow: "for advanced hickers only",
    imageUrl:
      "https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
    discovery: true,
    category: "hikes",
    visitedDate: "",
    latitude: 50.937531,
    longitude: 6.960279,
    locationName: "Unter Käster 1, 50667 Köln, Germany",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },
  // example 4
  {
    title: "Hiking in the Mountains",
    description: "That's a very cool spot, we just ca't believe that",
    goodToKnow: "for advanced hickers only",
    imageUrl:
      "https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
    discovery: true,
    category: "hikes",
    visitedDate: "",
    latitude: 39.08252,
    longitude: -94.582306,
    locationName:
      "Grand Boulevard Lofts, 1006 Grand Blvd, Kansas City, Missouri 64106, United States",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },
  // example 5
  {
    title: "The History museum",
    description:
      "Discover the history and cultureof locals and ravel trough time",
    goodToKnow: "20usd admission fee",
    imageUrl:
      "https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
    discovery: true,
    category: "cultureArts",
    visitedDate: "",
    latitude: 55.755825,
    longitude: 37.617298,
    locationName:
      "Russia, Московская область, Москва, поселение Московский, 108811, Дп Просвещенец 31",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

Wisdom.deleteMany()
  .then(() => {
    return Wisdom.create(wisdoms);
  })
  .then(wisdoms => {
    console.log(`${wisdoms.length} wisdoms created with the following id:`);
    console.log(wisdoms.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
/*
Gem.deleteMany()
  .then(() => {
    return Gem.create(gems);
  })
  .then((gems) => {
    console.log(`${gems.length} gems created with the following id:`);
    console.log(gems.map((u) => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });  */
