const jwt = require('jsonwebtoken');
const config = require('../config');
const userService = require('../database/services/user');

module.exports = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace('Bearer ', '');
      const { id } = jwt.verify(token, config.common.jwtSecret);
      const user = await userService.findRawUser({ where: id });
      req.user = user;
      return next();
    }
    if (req.headers.userid) {
      const user = await userService.findById(req.headers.userid);
      req.user = user;
      return next();
    }
    if (req.method === 'GET') {
      return next();
    }
    const { devicehash: hash, socketid: socketId = '' } = req.headers;
    const user = await userService.createUnknown({ hash, socketId });
    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};
