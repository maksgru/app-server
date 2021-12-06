const jwt = require('jsonwebtoken');
const config = require('../config');
const userService = require('../database/services/user');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Access token is missing!' });
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    const { id } = jwt.verify(token, config.common.jwtSecret);
    const user = await userService.findRawUser({ where: id });
    req.user = user.toJSON();
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is broken' });
  }
};
