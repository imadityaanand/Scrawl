require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


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

// creating user schema
const userSchema = new mongoose.Schema({
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


// Sign Up with Google
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
    console.log(profile);
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
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



// Regular Sign up and Log in routes
app.post("/signup", function(req, res) {
  const newUser = new User({
    username: req.body.email,
    name: req.body.name
  });
  console.log(req.body);
  newUser.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("http://localhost:3000/home");
    }
  });
})

app.post("/login", function(req, res) {
  const username = req.body.email;
  console.log(req.body);
  const name = req.body.name;
  User.findOne({username: username}, function(err, foundUser) {
    if(err) {
      console.log(err);
    } else {
      if(foundUser) {
        res.redirect("http://localhost:3000/home");
      } else {
        res.send("No user with this email");
      }
    }
  });
});