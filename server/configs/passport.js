const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt"); // !!!
const passport = require("passport");
// const FacebookStrategy = require("passport-facebook").Strategy;
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

// Local Strategy
passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (!foundUser) {
        next(null, false, { message: "Incorrect email." });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: "Incorrect password." });
        return;
      }
      next(null, foundUser);
    });
  })
);

// Social Sign up & Login Facebook --> Needs to be revised Success Failur Redirect not working and no immediate sign in

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: process.env.FACEBOOK_CALLBACK_URL //needs to adjusted to work online
//     },
//     function(accessToken, refreshToken, profile, done) {
//       User.findOne({ facebookId: profile.id }, (err, user) => {
//         if (user) {
//           return done(null, user);
//         } else {
//           console.log("New User");
//           User.create({
//             facebookId: profile.id
//           })
//             .then(user => {
//               console.log("User been created");
//               return done(null, user);
//             })
//             .catch(err => {
//               console.log(err);
//             });
//         }
//       });
//     }
//   )
// );

// Google Login
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL
//     },
//     function(token, tokenSecret, profile, done) {
//       User.findOne({ googleId: profile.id }, (err, user) => {
//         if (user) {
//           return done(null, user);
//         } else {
//           console.log("New User");
//           User.create({
//             googleId: profile.id
//           })
//             .then(user => {
//               console.log("User been created");
//               return done(null, user);
//             })
//             .catch(err => {
//               console.log(err);
//             });
//         }
//       });
//     }
//   )
// );
