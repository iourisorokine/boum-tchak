require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const session = require("express-session");
const passport = require("passport");

require("./server/configs/passport");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/boum-tchak", {
    useNewUrlParser: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

console.log("#### dir name", __dirname);

app.use(express.static(path.join(__dirname, "../client/build")));

// ADD SESSION SETTINGS HERE:

const MongoStore = require("connect-mongo")(session);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    reserve: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = "Express React app";

// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:

// ROUTES MIDDLEWARE STARTS HERE:

const index = require("./server/routes/index");
app.use("/", index);

const userRoutes = require("./server/routes/user");
app.use("/api/user", userRoutes);

const authRoutes = require("./server/routes/auth");
app.use("/api/auth", authRoutes);

const instrumentRoutes = require("./server/routes/instrument");
app.use("/api/instrument", instrumentRoutes);

const songRoutes = require("./server/routes/song");
app.use("/api/song", songRoutes);
app.use("/create/api/song", songRoutes);

const soundRoutes = require("./server/routes/sound");
app.use("/api/sound", soundRoutes);

// If no routes match, react html is sent
app.use((req, res) => {
  res.sendFile(__dirname + "../client/public/index.html");
});

module.exports = app;
