const { Model } = require('sequelize');
const { hash } = require('../../utils');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      this.hasMany(models.project);
      this.hasOne(models.device);
    }
  }
  User.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    googleId: DataTypes.STRING,
    password: DataTypes.STRING,
    isUserConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    role: {
      type: DataTypes.ENUM('unknown', 'user', 'client', 'admin', 'bot'),
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    sequelize,
    modelName: 'user'
  });
  User.addHook('beforeCreate', user => {
    if (user.password) {
      user.password = hash.generate(user.password);
    }
  });
  return User;
};
