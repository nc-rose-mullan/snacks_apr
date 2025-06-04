const express = require('express');
const app = express();

const {
  getSnackById,
  getSnacks,
  postSnacks,
} = require('./controllers/snacks.controllers.js');
const { getApi } = require('./controllers/api.controllers.js');

app.use(express.json());

app.get('/api', getApi);

app.get('/api/snacks', getSnacks);

app.get('/api/snacks/:snack_id', getSnackById);

app.post('/api/snacks', postSnacks);

module.exports = app;
