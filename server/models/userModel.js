const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String
    },
    name: String,
    username: String,
    googleId: String,
    picture: String,
    isGoogleUser: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// Static Signup method
userSchema.statics.signup = async function(email, password, name, username) {
    const exists = await this.findOne({ email });

    // Validation
    if(!email || !password || !name) {
        throw Error('All fields must be filled.');
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid.');
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough.');
    }

    if(exists) {
        throw Error('Email already in use.');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash, name, username });

    return user;
}

// Static Login method
userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error('All fields must be filled.');
    }

    const user = await this.findOne({ email });
    if(!user) {
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        throw Error('Incorrect password');
    }
    return user;
}


// Google Signin Method
userSchema.statics.googleSignin = async function(name, email, picture, googleId) {
    const user = await this.findOne({ email });
    if(!user) {
        const user = await this.create({ email, password: "", name, googleId, picture, isGoogleUser: true });
        return user;
    }
    return user;
}

module.exports = mongoose.model("User", userSchema);