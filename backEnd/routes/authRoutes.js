const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware').protect;

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', loginUser);

// @route   GET /api/auth/me
// @desc    Get current logged-in user
router.get('/me',protect, getCurrentUser);

module.exports = router;
