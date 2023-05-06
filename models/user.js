'use strict';
const {
  Model
} = require('sequelize');
const commonConfig = require('../config/common.config');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Cars, {
        foreignKey: "createdByFk"
      })
      this.hasMany(models.Cars, {
        foreignKey: "updatedByFk"
      })
      this.hasMany(models.Cars, {
        foreignKey: "deletedByFk"
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: commonConfig.roles,
      defaultValue: commonConfig.memberRole
    }
  }, {
    sequelize,
    modelName: 'Users',
  });

  return User;
};