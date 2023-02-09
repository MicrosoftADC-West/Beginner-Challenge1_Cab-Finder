const express = require('express');
const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

module.exports = app;
