const { body } = require('express-validator');

module.exports = {
  signUp: [
    body('firstName', 'Please provide your name!').exists({ checkFalsy: true }),
    body('email', 'Email is missing!').exists({ checkFalsy: true }),
    body('email', 'Email has wrong format.').isEmail().normalizeEmail(),
    body('password', 'Password is missing.').exists({ checkFalsy: true })
  ],
  signIn: [
    body('email', 'Email is missing!').exists({ checkFalsy: true }),
    body('email', 'Email has wrong format.').isEmail().normalizeEmail(),
    body('password', 'Password is missing.').exists({ checkFalsy: true })
  ]
};
