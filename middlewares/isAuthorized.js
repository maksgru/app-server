const jwt = require('jsonwebtoken');
const config = require('../config');
const userServise = require('../database/services/user');

module.exports = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Access token is missing!' });
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    const { id } = jwt.verify(token, config.common.jwtSecret);
    const user = await userServise.findOneUser({ where: id });
    req.user = user;
  } catch (error) {
    return res.json(error);
  }
};
