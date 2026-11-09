'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('session_players', {
      session_player_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      session_id: { type: Sequelize.INTEGER, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // Add unique constraint for one seat per account per game/session
    await queryInterface.addConstraint('session_players', {
      fields: ['session_id', 'user_id'],
      type: 'unique',
      name: 'session_players_session_id_user_id_unique'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('session_players');
  }
};