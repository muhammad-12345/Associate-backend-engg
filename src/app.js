const express = require('express');
const bodyParser = require('body-parser');
const workshopRoutes = require('./routes/workshopRoutes');

const app = express();

// this is the middleware for parsing JSON requests
app.use(bodyParser.json());

// this is to register workshop routes under /api/workshops
app.use('/api/workshops', workshopRoutes);

module.exports = app;
