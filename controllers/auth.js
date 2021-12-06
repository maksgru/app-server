const { pick } = require('lodash');
const userService = require('../database/services/user');
const { hash, createTokensPair } = require('../utils');
const { USER_FIELDS_REGULAR } = require('../utils/constants');
const getImageBylink = require('../utils/getImageBylink');

const signUp = async (req, res, next) => {
  try {
    const userData = req.body;
    let [user, created] = await userService.findOrCreate({
      where: {
        email: userData.email
      },
      defaults: {
        ...userData
      }
    });
    if (!created) {
      throw { status: 400, message: 'Email already registered' };
    }
    user = pick(user.toJSON(), USER_FIELDS_REGULAR);

    const tokens = createTokensPair(user);

    return res.json({ ...tokens, user });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await userService.findRawUser({ where: { email } });
    if (!user) throw { status: 404, message: 'User not found!' };
    if (!hash.compare(password, user.password)) {
      throw { status: 403, message: 'Wrong password' };
    }
    user = pick(user.toJSON(), USER_FIELDS_REGULAR);

    const tokens = createTokensPair(user.id);

    return res.json({ ...tokens, user });
  } catch (error) {
    next(error);
  }
};

const googleSignIn = async (req, res, next) => {
  try {
    const { email, ...defaults } = req.body;
    const { avatar } = defaults;
    if (avatar) {
      defaults.avatar = getImageBylink(avatar);
    }
    let [user] = await userService.findOrCreate({
      where: { email },
      defaults
    });
    user = pick(user.toJSON(), USER_FIELDS_REGULAR);
    const tokens = createTokensPair(user);
    return res.json({ ...tokens, user });
  } catch (error) {
    next(error);
  }
};

const authorize = (req, res) => {
  const user = pick(req.user, USER_FIELDS_REGULAR);
  return res.json({ user });
};

module.exports = {
  signUp,
  signIn,
  googleSignIn,
  authorize
};
