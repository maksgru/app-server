const { omit } = require('lodash');
const userService = require('../database/services/user');
const { hash, createTokensPair } = require('../utils');
const { USER_FIELDS_EXCLUDE } = require('../utils/constants');

const signUp = async (req, res, next) => {
  try {
    const userData = req.body;
    const [newUser, isCreated] = await userService.findOrCreate({
      where: {
        email: userData.email
      },
      defaults: {
        ...userData
      }
    });
    if (!isCreated) {
      throw { status: 400, message: 'Email already registered' };
    }
    let user = newUser.toJSON();
    user = omit(user, USER_FIELDS_EXCLUDE);
    const tokens = createTokensPair(user);

    return res.json({ ...tokens, user });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await userService.signIn({ where: { email } });
    if (!user) throw { status: 404, message: 'User not found!' };
    if (!hash.compare(password, user.password)) {
      throw { status: 403, message: 'Wrong password' };
    }
    user = user.toJSON();
    user = omit(user, USER_FIELDS_EXCLUDE);
    const tokens = createTokensPair(user);

    return res.json({ ...tokens, user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signIn
};
