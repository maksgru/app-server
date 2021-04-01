const logger = require('./logger');

module.exports = (err, req, res) => {
  const errorStatus = err.status || 500;
  const errorBody = {
    text: `Error: ${err.message}`,
    routeName: `${req.hostname}/${req.originalUrl}`
  };
  if (errorStatus >= 500) {
    logger.error(errorBody);
  } else {
    logger.info(errorBody);
  }
  const response = {};
  if (err.errors) {
    response.errors = err.errors;
  } else {
    response.errors = [
      {
        message: err.message,
        param: err.param
      }
    ];
  }
  return res.status(errorStatus).json({ status: err.status, ...response });
};
