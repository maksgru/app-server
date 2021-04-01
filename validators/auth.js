const { body } = require('express-validator');

module.exports = {
  signUp: [
    body('firstName', 'Please provide your name!').exists({ checkFalsy: true }),
    body('phone', 'Mobile phone number is missing!').exists({ checkFalsy: true }),
    body('phone', 'Mobile phone number has wrong format!').custom(phone => {
      phone = phone.replace(/[\s-]/g, '');
      return /^(\+7|8)\d{10}$/.test(phone);
    })
  ],
  signIn: [
    body('phone', 'Mobile phone number is missing!').exists({ checkFalsy: true }),
    body('phone', 'Mobile phone number has wrong format!').custom(phone => {
      phone = phone.replace(/ /g, '');
      return /^(\+7|8)\d{10}$/.test(phone);
    })
  ],
  verify: [
    body('smsCode', 'Verification code is missing!').exists({ checkFalsy: true }),
    body('phone', 'Mobile phone number is missing!').exists({ checkFalsy: true })
  ]
};
