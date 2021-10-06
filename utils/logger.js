const { createLogger, format, transports } = require('winston');

const { json } = format;
const logger = createLogger({
  level: 'error',
  transports: [
    new transports.File({ filename: 'combined.log' }),
    new transports.Console({
      format: json()
    })
  ]
});

module.exports = logger;
