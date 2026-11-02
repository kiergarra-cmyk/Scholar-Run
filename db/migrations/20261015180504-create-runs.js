'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('runs', {
      run_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
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
      },
      energy: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 100 },
      score: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      final_score: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      status: { type: Sequelize.STRING(20), allowNull: false }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('runs');
  }
};
