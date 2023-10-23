require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const helmet = require('helmet');
const cors = require('cors');

const { connectToDatabase } = require('./utils/db');
const config = require('./config/keys');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    helmet({
        contentSecurityPolicy: false,
        frameguard: true
    })
);
app.use(cors());
app.use(routes);

const startServer = () => {
    // Connect to the database
    connectToDatabase();

    // Start the server
    app.listen(config.port, () => {
        console.log(`\x1b[33m Server is running on port ${config.port} \x1b[0m`);
    });

    // Handle server and database connection errors
    app.on('error', (error) => {
        console.error('Server error:', error);

        // Attempt to close the server gracefully
        app.close(() => {
            console.log('Server closed.');

            // Attempt to reconnect to the database
            connectToDatabase();

            // Retry starting the server after a short delay
            setTimeout(startServer, 1000);
        });
    });
};

// Start the server
startServer();
