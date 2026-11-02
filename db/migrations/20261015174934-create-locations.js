'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      location_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      energy_reward: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('locations');
  }
};
