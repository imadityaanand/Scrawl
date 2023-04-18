require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const mongoose = require('mongoose');
const session = require("express-session");

const multer = require('multer');
const fs = require('fs');

const zlib = require('zlib');
const jwt = require('jsonwebtoken');
const pdfjsLib = require('pdfjs-dist');

const events = require('events');


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

// app.use(passport.initialize());
// app.use(passport.session());


// Routes
app.use('/api/user', userRoutes);





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


// NodeJS Events
const eventEmitter = new events.EventEmitter();

const testListener = function testListener() {
  console.log("Test Listener executed successfully.");
}

eventEmitter.on('openpdf', testListener);


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
  data: Buffer,
  numPages: Number,
  username: String,
  likes: Number
});
const Pdf = mongoose.model('Pdf', pdfSchema);

app.post('/upload', upload.single('pdf'), async (req, res) => {
  console.log('File upload request received');
  const { title, description, tags } = req.body;

  if(!req.file) {
    res.send("No PDF file specified.");
  }
  const filePath = req.file.path;
  const fileContent = fs.readFileSync(filePath);
  const compressedContent = zlib.gzipSync(fileContent);

  async function savePdf() {
    const doc = await pdfjsLib.getDocument(filePath).promise;
    let numPages = doc.numPages;
    console.log(numPages);
    const pdf = new Pdf({
      title,
      description,
      tags,
      data: compressedContent,
      numPages
    });
    await pdf.save();
  }
  
  savePdf();
  console.log("File uploaded successfully");
  res.send('File uploaded successfully');
});


// Handle PDF Requests

app.get('/pdfs', async (req, res) => {
  const pdfs = await Pdf.find({});
  // console.log(pdfs);
  res.send(pdfs);
});


// Handle pdf view requests

app.get('/pdf/:id', async (req, res) => {
  const pdf = await Pdf.findById(req.params.id);
  const decompressedContent = zlib.gunzipSync(pdf.data);
  // console.log(pdf.data);
  eventEmitter.emit('openpdf');
  res.set('Content-Type', 'application/pdf');
  res.send(decompressedContent);
});
