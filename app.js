const express = require('express');
const cors = require('cors');
const errorHandler = require('./utils/errorHandler');
const routes = require('./routes');

const app = express();

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.originalUrl.indexOf('/public') === -1) {
    console.log(`${req.method} : ${req.originalUrl}`);
  }
  next();
});

routes(app);

app.use((err, req, res, next) => errorHandler(err, req, res, next));

module.exports = app;
