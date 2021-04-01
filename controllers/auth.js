const { omit } = require('lodash');
const config = require('../config');
const userService = require('../database/services/user');
const { hash, createTokensPair } = require('../utils');
const { USER_FIELDS_EXCLUDE } = require('../utils/constants');

/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         schema:
 *           type: object
 *           required:
 *           - phone
 *           - firstName
 *           properties:
 *             phone:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *     responses:
 *       200:
 *         description: sign up
 */
const signUp = async (req, res, next) => {
  try {
    const userData = req.body;
    const [user] = await userService.findOrCreate({
      where: {
        phone: userData.phone
      },
      defaults: {
        ...userData
      }
    });
    if (user.isUserConfirmed) {
      throw { status: 400, message: 'Phone number is busy, please try sign in.' };
    }
    const smsCode = Math.floor(1000 + Math.random() * 9000).toString();
    // await sendSmsCode(smsCode)
    user.smsCode = hash.generate(smsCode);
    user.smsCodeExpiresAt = Date.now() + config.common.smsCodeExpiresIn;
    await user.save();

    return res.json({
      message: `SMS code sended to ${userData.phone}.`,
      smsCodeExpiresAt: user.smsCodeExpiresAt,
      devModeSmsCode: smsCode
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "(+7|8)xxxxxxxxxx"
 *         schema:
 *           type: "object"
 *           properties:
 *             phone:
 *               type: string
 *     responses:
 *       200:
 *         description: sms code expiration
 */
const signIn = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const user = await userService.findOneUser({ where: { phone } });
    if (!user) throw { status: 404, message: 'User not found!' };
    user.smsCode = hash.generate('2222');
    user.smsCodeExpiresAt = Date.now() + config.common.smsCodeExpiresIn;
    await user.save();

    return res.json({
      message: `SMS code sended to ${phone}.`,
      smsCodeExpiresAt: user.smsCodeExpiresAt,
      devModeSmsCode: '2222'
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { phone, smsCode } = req.body;
    let user = await userService.verifyUser({ where: { phone } });

    if (!user) throw { status: 404, message: 'User not found!' };
    if (!hash.compare(smsCode, user.smsCode)) throw { status: 403, message: 'Wrong sms code!' };
    if (user.smsCodeExpiresAt < new Date()) throw { status: 403, message: 'Sms code expired!' };

    user.smsCode = null;
    await user.save();
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
  signIn,
  verify
};
