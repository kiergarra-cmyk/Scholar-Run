'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('session_players', {
      session_player_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      session_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'tournament_sessions', key: 'session_id' },
        onDelete: 'CASCADE'
      },
      player_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'players', key: 'player_id' },
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('session_players');
  }
};
