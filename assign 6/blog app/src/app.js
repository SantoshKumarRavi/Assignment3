const express = require('express');
const app = express();
const path = require('path');

// Import routes
const blogRoute = require('./routes/blog');

app.use(express.static(path.join(__dirname, 'public')));
//Router MIddlewares
app.use(express.json());
app.use('/', blogRoute);
// app.use(express.static('public'));

module.exports = app;
