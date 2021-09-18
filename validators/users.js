const { param, query } = require('express-validator');

module.exports = {
  getOne: [
    param('id', 'Wrong user id').isInt(),
  ],
  getAll: [
    query('offset', 'Wrong offset').optional().isInt(),
    query('limit', 'Wrong limit').optional().isInt(),
  ]
};
