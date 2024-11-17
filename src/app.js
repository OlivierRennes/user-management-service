// src/app.js

const express = require('express');

const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');

require('dotenv').config();


const app = express();


// Connect to MongoDB

connectDB();


// Middleware

app.use(express.json());


// Routes

app.use('/api/users', userRoutes);

// Error handling middleware (optional)

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).send('Something broke!');

});


module.exports = app;