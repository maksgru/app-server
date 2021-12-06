const _defaultsDeep = require('lodash/defaultsDeep');
require('colors');

const env = process.env.NODE_ENV || 'development';
const infoString = ['\n', '>>> Config loaded from config.json for '.bgWhite.blue, env.red.bold.bgWhite, ' environment'.bgWhite.blue, '\n'].join('');
let localConfig;
try {
  localConfig = require('./config.json');
  console.log(infoString);
} catch (err) {
  console.error(`>>> \u001b[32m${'config.json not found'}\u001b[39m`, err);
}

let config = {
  development: {
    db: {
      username: 'AppUser',
      password: 'appuser',
      database: 'app-db',
      host: '127.0.0.1',
      dialect: 'postgres',
      logging: false
    },
    common: {
      jwtSecret: 'dedio3jm',
      hashSecret: '2wh44k',
      accessTokenExpiresIn: 172800000,
      refreshTokenExpiresIn: 604800000,
      smsCodeExpiresIn: 36e5,
      url: 'http://localhost:4300',
      siteAddress: 'http://localhost:3000',
      port: '4300'
    },
    mail: {
      serviceEmail: '',
      servicePassword: '',
      service: 'gmail'
    }
  }
};

if (localConfig) {
  config = _defaultsDeep(localConfig, config);
}
module.exports = config[env];
