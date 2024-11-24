// src/config/db.js
const mongoose = require('mongoose'); // Import mongoose
require('dotenv').config(); // Load environment variables

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected'); // Log success message
    } catch (error) {
        console.error('MongoDB connection error:', error); // Log connection error
        process.exit(1); // Exit the process if connection fails
    }
};

module.exports = connectDB; // Export the connection function