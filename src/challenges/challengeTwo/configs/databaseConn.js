const mysql = require('mysql2');
const config = require('./config');

const pool = mysql.createPool({
  host: 'localhost',
  user: config.dbUsername,
  database: config.dbName,
  password: config.dbPassword
});


module.exports = pool.promise();