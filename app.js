const express = require('express');
const app = express();
const {
  getSnackById,
  getSnacks,
  postSnacks,
} = require('./controllers/snacks.controllers.js');
const { getApi } = require('./controllers/api.controllers.js');
const {
  handlePostgresErrors,
  handleCustomErrors,
  handleServerErrors,
} = require('./errors.js');
const ejs = require("ejs")

app.use(express.json());

app.set("view engine", "ejs")
app.set("views", "public")

app.use(express.static("public"))

app.get('/api', getApi)

app.get('/api/snacks', getSnacks);

app.get('/api/snacks/:snack_id', getSnackById);

app.post('/api/snacks', postSnacks);

app.use((req, res) => {
  res.status(404).send({ msg: 'silly sausage, no endpoint here!' });
});

app.use(handlePostgresErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
