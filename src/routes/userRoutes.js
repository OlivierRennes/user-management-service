// src/routes/userRoutes.js

const express = require('express');

const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', authMiddleware, getUserProfile);

router.put('/profile', authMiddleware, updateUserProfile); 

router.delete('/profile', authMiddleware, deleteUserProfile);

module.exports = router;