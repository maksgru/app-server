const { body } = require('express-validator');

module.exports = {
  signUp: [
    body('firstName', 'Please provide your first name!').optional().isString(),
    body('lastName', 'Please provide your last name!').optional().isString(),
    body('email', 'Email is missing or wrong format!').exists({ checkFalsy: true }).isEmail().normalizeEmail(),
    body('password', 'Password is missing.').exists({ checkFalsy: true }).isString({ length: 6 })
  ],
  signIn: [
    body('email', 'Email is missing or wrong format!').exists({ checkFalsy: true }).isEmail().normalizeEmail(),
    body('password', 'Password is missing.').exists({ checkFalsy: true })
  ],
  googleSignIn: [
    body('firstName', 'Please provide your first name!').optional().isString(),
    body('lastName', 'Please provide your last name!').optional().isString(),
    body('email', 'Email is missing or wrong format!').exists({ checkFalsy: true }).isEmail().normalizeEmail()
  ]
};
