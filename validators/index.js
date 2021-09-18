const { validationResult, matchedData } = require('express-validator');

module.exports = validators => [
  ...validators,
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const queryData = matchedData(req, { locations: ['query'] });
      const bodyData = matchedData(req, { locations: ['body'] });
      req.body = bodyData;
      req.query = queryData;
      return next();
    }
    return res.status(400).json({ errors: errors.array() });
  }
];
