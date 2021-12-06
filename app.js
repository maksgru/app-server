const express = require('express');
const cors = require('cors');
const config = require('./config');
const errorHandler = require('./utils/errorHandler');
const routes = require('./routes');
const initialize = require('./utils/initialize');

const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: config.whiteList,
  credentials: true
}));

app.use((req, res, next) => {
  if (req.originalUrl.indexOf('/public') === -1) {
    console.log(`${req.method} : ${req.originalUrl}`);
  }
  next();
});

routes(app);
initialize(app);

app.use((err, req, res, next) => errorHandler(err, req, res, next));

module.exports = app;
