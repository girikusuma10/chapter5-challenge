'use strict';

const commonConfig = require('../config/common.config');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cars', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      perDayRentPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      size: {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: commonConfig.smallCar,
        values: commonConfig.carSizes,
      },
      image: {
        type: Sequelize.STRING,
      },
      createdByFk: {
        type: Sequelize.STRING,
        references: { model: 'Users', key: 'email' }
      },
      updatedByFk: {
        type: Sequelize.STRING,
        references: { model: 'Users', key: 'email' }
      },
      deletedByFk: {
        type: Sequelize.STRING,
        references: { model: 'Users', key: 'email' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cars');
  }
};