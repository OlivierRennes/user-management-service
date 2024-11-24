// src/server.js
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Delay the connection for a few seconds
const startServer = async () => {
    try {
        //await connectDB(); // Attempt to connect to MongoDB
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit if connection fails
    }
};

startServer();