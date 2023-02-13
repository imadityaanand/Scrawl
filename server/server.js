require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const workoutRoutes = require('./routes/workouts');

const app = express();

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use(express.json());

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/api/workouts', workoutRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Success');
        app.listen(process.env.PORT, () => {
            console.log('Server started on port', process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    }, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
// mongoose.set("useCreateIndex", true);

// creating user schema
const userSchema = new mongoose.Schema ({
    username: String,
    name: String,
    googleId: String,
    secret: String,
    picture: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// creating a user
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:3000/home");
});

app.get("/logout", function(req, res){
    res.redirect("http://localhost:3000/");
});