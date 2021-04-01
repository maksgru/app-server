const { validationResult } = require('express-validator');

module.exports = validators => [
  ...validators,
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ errors: errors.array() });
  }
];
