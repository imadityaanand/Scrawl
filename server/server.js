require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

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

const zlib = require('zlib');
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const jwt = require('jsonwebtoken');


const User = require('./models/userModel');


const userRoutes = require('./routes/user');



// [12] middlewares 

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


// Routes
app.use('/api/user', userRoutes);





//////////////


// // connect to db
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

// // creating user schema     [17] Schemas and Models
// const userSchema = new mongoose.Schema({
//     username: String,
//     name: String,
//     googleId: String,
//     password: String,
//     picture: String
// });

// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

// // creating a user
// const User = new mongoose.model("User", userSchema);


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
  async function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log("Name: ", profile.displayName);
    console.log("Email: ", profile._json.email);
    console.log("Picture: ", profile._json.picture);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });

    const name = profile.displayName;
    const email = profile._json.email;
    const picture = profile._json.picture;
    const googleId = profile.id;

    // User.googleSignin(name, email, picture, googleId);

    try {
      const user = await User.findOne({ email });

      if (user) {
        done(null, user);
      } else {
        const newUser = await User.create({
          email,
          password: "",
          name,
          googleId,
          picture,
          isGoogleUser: true
        })

        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET, {
          expiresIn: '3d',
        });

        done(null, newUser, { token });
      }
    } catch(err) {
        console.error(err);
        done(err, null);
    } 
  }
));


app.get("/auth/google",
  (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    req.header(
      'Access-Control-Allow-Origin', 'http://localhost:3000'
    )},
    
  passport.authenticate("google", { scope: ["profile", "email"] })

);

app.get("/auth/google/callback",
  passport.authenticate("google", {
    // failureRedirect: '/fail'
    session: false
  }),
  (req, res) => {
    console.log(req);
    console.log("USERRRRRRR: ", req.user);
    const user = req.user;
    const { token } = req.authInfo;
    // res.header("Access-Control-Allow-Origin", "*");
    // req.header(
    //   'Access-Control-Allow-Origin', 'http://localhost:3000'
    // )
    res.json({ user, token });
  }
);





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
  const compressedContent = zlib.gzipSync(fileContent);
  const pdf = new Pdf({ title, description, tags, data: compressedContent });
  await pdf.save();
  console.log("File uploaded successfully");
  res.send('File uploaded successfully');
});


// Handle PDF Requests

app.get('/pdfs', async (req, res) => {
  const pdfs = await Pdf.find({});
  // console.log(pdfs);
  res.send(pdfs);
});

// handle pdf view requests

// app.get('/pdfs/:id', async (req, res) => {
//   const id = req.params.id;
//   const pdf = await Pdf.findById(id);

//   if (!pdf) {
//     return res.status(404).send('Pdf not found');
//   }

//   const pdfPath = path.join(__dirname, 'uploads', `${pdf._id}`);
//   fs.writeFileSync(pdfPath, pdf.data);

//   res.sendFile(pdfPath, { headers: { 'Content-Type': 'application/pdf' } }, (err) => {
//     if (err) {
//       console.log(err);
//       res.status(err.status).end();
//     } else {
//       fs.unlinkSync(pdfPath);
//     }
//   });
// });

app.get('/pdf/:id', async (req, res) => {
  const pdf = await Pdf.findById(req.params.id);
  const decompressedContent = zlib.gunzipSync(pdf.data);
  res.set('Content-Type', 'application/pdf');
  res.send(decompressedContent);
  // res.send("pdf")

  // const pdf = await Pdf.findById(req.params.id);
  // const decompressedContent = zlib.gunzipSync(pdf.data);
  // res.set('Content-Type', 'application/pdf');
  // res.contentType("application/pdf");
  // res.send(decompressedContent);
});





////////////
// app.listen(process.env.PORT, () => {
//   console.log('Server started on port', process.env.PORT);
// });