'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('players', {
      player_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(100), allowNull: false }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('players');
  }
};
