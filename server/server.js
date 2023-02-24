require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const bcrypt = require('bcrypt');
const saltRounds = 12;

const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const app = express();

// [12] middlewares 
app.use(cors());
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
mongoose.set("strictQuery", false);
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
// mongoose.set('useCreateIndex', true);

// creating user schema     [17] Schemas and Models
const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    googleId: String,
    password: String,
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

app.get('/home', function(req, res){
  if(req.isAuthenticated()) {
    res.redirect('http://localhost:3000/home');
  } else {
    res.redirect('http://localhost:3000/login');
  }
});

app.get('/signup', function(req, res) {
  res.redirect('http://localhost:3000/signup');
})

// Regular Sign up and Log in routes
app.post("/signup", function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newUser = new User({
      username: req.body.email,
      name: req.body.name,
      password: hash
    });
    console.log(req.body);
    newUser.save(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect("http://localhost:3000/home");
      }
    });
  });
  // User.register({username: req.body.email, password: req.body.password}, req.body.password, function(err, user) {
  //   if(err) {
  //     console.log(err);
  //     res.redirect('http://localhost:3000/signup');
  //   } else {
  //     console.log(req.body);
  //     // passport.authenticate('local')(req, res, function() {
  //     //   res.redirect('/home');
  //     // });
  //     const authenticate = User.authenticate();
  //     authenticate('username', 'password', function(err, result) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.redirect('/home');
  //       }
  //     });
  //   }
  // });
});

app.post("/login", function(req, res) {
  const username = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  const name = req.body.name;
  User.findOne({username: username}, function(err, foundUser) {
    if(err) {
      console.log(err);
    } else {
      if(foundUser) {
        bcrypt.compare(password, foundUser.password, function(err, result) {
          if(result) {
            res.redirect("http://localhost:3000/home");
          } else {
            res.send("Incorrect password");
          }
        });
        
      } else {
        res.send("No user with this email");
      }
    }
  });
});



// Uploading Notes

const dir = './uploads';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Destination function executed');
    cb(console.log("error in destination"), './uploads')
  },
  filename: function (req, file, cb) {
    console.log('Filename function executed');
    cb(console.log("error in filename"), file.originalname)
  }
});

const upload = multer({ storage: storage });

const pdfSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  data: Buffer
});
const Pdf = mongoose.model('Pdf', pdfSchema);

app.post('/upload', upload.single('pdf'), async (req, res) => {
  console.log('File upload request received');
  const filePath = req.file.path;
  const { title, description, tags } = req.body;
  const fileContent = fs.readFileSync(filePath);
  const pdf = new Pdf({ title, description, tags, data: fileContent });
  await pdf.save();
  console.log("File uploaded successfully");
  res.send('File uploaded successfully');
});