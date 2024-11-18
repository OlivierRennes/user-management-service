// src/controllers/userController.js

const User = require('../models/userModel');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

// Register a new user

exports.registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {

        res.status(500).json({ error: 'Error registering user' });

    }

};


// Login a user

exports.loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: 'User not found' });


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });

    } catch (error) {

        res.status(500).json({ error: 'Error logging in' });

    }

};


// Get user profile

exports.getUserProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select('-password');

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({ error: 'Error fetching user profile' });

    }

};

// Update user profile

exports.updateUserProfile = async (req, res) => {

    const { username, email, password } = req.body;

    const updates = {};


    // Only update fields that are provided

    if (username) updates.username = username;

    if (email) updates.email = email;

    if (password) {

        // If a new password is provided, hash it before updating

        const hashedPassword = await bcrypt.hash(password, 10);

        updates.password = hashedPassword;

    }


    try {

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true });

        if (!updatedUser) return res.status(404).json({ error: 'User not found' });

        

        // Exclude sensitive information (like password) from the response

        const { password, ...userData } = updatedUser.toObject();

        res.status(200).json(userData);

    } catch (error) {

        res.status(400).json({ error: 'Error updating user profile', details: error.message });

    }

};

// Delete user profile

exports.deleteUserProfile = async (req, res) => {

    try {

        const deletedUser = await User.findByIdAndDelete(req.user.id);

        if (!deletedUser) return res.status(404).json({ error: 'User not found' });


        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {

        res.status(500).json({ error: 'Error deleting user profile', details: error.message });

    }

};