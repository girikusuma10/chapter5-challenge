'use strict';

const commonConfig = require('../config/common.config');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      email: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      password: Sequelize.STRING,
      name: Sequelize.STRING,
      role: {
        type: Sequelize.ENUM,
        values: commonConfig.roles,
        defaultValue: commonConfig.memberRole
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};