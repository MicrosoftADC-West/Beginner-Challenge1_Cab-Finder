const dotenv = require('dotenv');
dotenv.config();

const config = Object.freeze({
    dbName: process.env.DBName,
    dbUsername: process.env.DBUsername,
    dbPassword: process.env.DBPassword,
    
    port: process.env.port
});

module.exports = config;