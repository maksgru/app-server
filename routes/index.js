const express = require('express');
const fs = require('fs');
const changeCase = require('change-case');

const routes = fs.readdirSync(__dirname).filter(route => route !== 'index.js');

module.exports = app => {
  routes.forEach(routeName => {
    const route = routeName.replace('.js', '');
    const router = express.Router();
    // eslint-disable-next-line
    require(`./${route}`)(router);
    app.use(`/api/${changeCase.paramCase(route)}`, router);
  });
};
