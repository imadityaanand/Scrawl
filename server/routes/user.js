const express = require('express');

// Controller functions
const { loginUser, signupUser, googleSigninUser } = require('../controllers/userController');

const router = express.Router();

// Login Route
router.post('/login', loginUser);

// Signup Route
router.post('/signup', signupUser);

// Google Signin Route
router.post('/googlesignin', googleSigninUser);

module.exports = router;