'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date().toLocaleString()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date().toLocaleString()
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};