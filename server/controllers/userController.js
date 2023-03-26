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

        // const {name} = await User.findOne({email}).select('name');
        const {name, username} = await User.findOne({email}).select('name username');
        res.status(200).json({name, username, email, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// Signup User
const signupUser = async (req, res) => {
    const { email, password, name } = req.body;

    // Create Username
    async function createUsername(str) {
        let username = email.slice(0, str.indexOf("@"));

        console.log("First: ",username);
        const user = await User.findOne({username});
        console.log(user);
        if(!user) {
            return username;
        } else {
            async function saltUsername(name) {
                name += (Math.round(Math.random() * 1000)).toString();
                // console.log("Name: ", name);
                const user = await User.findOne({name});
                if(!user) {
                    return name;
                } else {
                    saltUsername(name);
                }
            }
            
            const newname = await saltUsername(username);
            return newname;
        }
    }

    const username = await createUsername(email);
    
    

    try {
        const user = await User.signup(email, password, name, username);

        // Create a token
        const token = createToken(user._id);


        res.status(200).json({name, email, username, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}


// Google Signin User
const googleSigninUser = async (req, res) => {
    const { name, email, picture, googleId, token } = req.body;

    // const user = await User.findOne({email});

    // if(!user) {
    //     async function createUsername(str) {
    //         let username = email.slice(0, str.indexOf("@"));
    //         const user = await User.findOne({username});
    //         if(!user) {
    //             return username;
    //         } else {
    //             async function saltUsername(name) {
    //                 username += (Math.random() * 1000).toString();
    //                 const user = await User.findOne({username});
    //                 if(!user) {
    //                     return username;
    //                 } else {
    //                     saltUsername(username);
    //                 }
    //             }
    //         }
    //     }

    //     const username = createUsername(email);
    // }

    try {
        const user = await User.googleSignin(name, username, email, picture, googleId);
        res.status(200).json({name, email, picture, googleId, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {loginUser ,signupUser, googleSigninUser};