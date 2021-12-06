const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    static associate (models) {
      this.belongsTo(models.user);
    }
  }
  Device.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    socketId: {
      type: DataTypes.TEXT
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'device'
  });
  return Device;
};
