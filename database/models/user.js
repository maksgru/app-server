const { Model } = require('sequelize');
const { hash } = require('../../utils');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
 
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    smsCode: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isUserConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    smsCodeExpiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
  });
  User.addHook('beforeCreate', user => {
    user.password = hash.generate(user.password);
  });
  return User;
};