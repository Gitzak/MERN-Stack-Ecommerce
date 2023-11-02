require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config/keys');

const {connection} = require('./utils/database')
const database = connection();


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



database.connectToMongo();


app.listen(config.port, () => {
    console.log(`\x1b[33m Server is running on port ${config.port} \x1b[0m`);
});


