const { body } = require('express-validator');

module.exports = {
  signUp: [
    body('firstName', 'Please provide your first name!').exists({ checkFalsy: true }),
    body('lastName', 'Please provide your last name!').exists({ checkFalsy: true }),
    body('email', 'Email is missing or wrong format!').exists({ checkFalsy: true }).isEmail().normalizeEmail(),
    body('password', 'Password is missing.').exists({ checkFalsy: true })
  ],
  signIn: [
    body('email', 'Email is missing or wrong format!').exists({ checkFalsy: true }).isEmail().normalizeEmail(),
    body('password', 'Password is missing.').exists({ checkFalsy: true })
  ]
};
