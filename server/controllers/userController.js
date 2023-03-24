const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

// Login User
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);

        // Create a token
        const token = createToken(user._id);

        const {name} = await User.findOne({email}).select('name');
        res.status(200).json({name, email, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// Signup User
const signupUser = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const user = await User.signup(email, password, name);

        // Create a token
        const token = createToken(user._id);


        res.status(200).json({name, email, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}


// Google Signin User
const googleSigninUser = async (req, res) => {
    const { name, email, picture, googleId, token } = req.body;

    try {
        const user = await User.googleSignin(name, email, picture, googleId);
        res.status(200).json({name, email, picture, googleId, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {loginUser ,signupUser, googleSigninUser};