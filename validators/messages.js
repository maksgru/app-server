const { query } = require('express-validator');

module.exports = {
  getAll: [
    query('offset', 'Wrong offset').optional().isInt(),
    query('limit', 'Wrong limit').optional().isInt()
  ]
};
