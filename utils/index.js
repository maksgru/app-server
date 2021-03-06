const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config');

exports.createTokensPair = user => ({
  accessToken: jwt.sign(user, config.common.jwtSecret, {
    expiresIn: config.common.accessTokenExpiresIn
  }),
  refreshToken: 'refresh token not supported'
});

exports.hash = {
  generate: string => crypto.createHmac('md5', config.common.hashSecret)
    .update(string)
    .digest('hex'),
  compare: (string, hash) => this.hash.generate(string) === hash
};
