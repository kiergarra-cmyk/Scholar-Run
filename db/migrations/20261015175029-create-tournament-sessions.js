'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tournament_sessions', {
      session_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      host_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'hosts', key: 'host_id' },
        onDelete: 'CASCADE'
      },
      status: { type: Sequelize.STRING(20), allowNull: false },
      max_players: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 10 }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tournament_sessions');
  }
};
