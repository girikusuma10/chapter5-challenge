'use strict';
const {
  Model
} = require('sequelize');
const commonConfig = require('../config/common.config');


module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        as: "createdBy",
        foreignKey: "createdByFk"
      })
      this.belongsTo(models.Users, {
        as: "updatedBy",
        foreignKey: "updatedByFk"
      })
      this.belongsTo(models.Users, {
        as: "deletedBy",
        foreignKey: "deletedByFk"
      })

    }
  }

  Cars.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    perDayRentPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: commonConfig.smallCar,
      values: commonConfig.carSizes,
    },
    image: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Cars',
    paranoid: true
  });

  return Cars;
};