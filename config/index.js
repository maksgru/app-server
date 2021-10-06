const _defaultsDeep = require('lodash/defaultsDeep');

const env = process.env.NODE_ENV || 'development';
let localConfig;
try {
  localConfig = require('./config.json');
  console.log(`>>> \u001b[32mConfig loaded from config.json for '${env}' environment\u001b[39m`);
} catch (err) {
  console.error(`>>> \u001b[32m${'Local config not found'}\u001b[39m`, err);
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
