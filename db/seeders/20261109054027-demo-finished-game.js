'use strict';

module.exports = {
  async up(queryInterface) {
    const db = queryInterface.sequelize;
    
    // 1. Find the parents created by the earlier user seeder
    const [[host]] = await db.query("SELECT user_id FROM users WHERE school_id = '2099-0001'");
    // Add queries for other parent tables (like question_sets) if required by your schema

    // 2. Insert a game session that has ENDED
    await queryInterface.bulkInsert('game_sessions', [{
      host_id: host.user_id,
      join_pin: '418231',
      status: 'CLOSED',
      started_at: new Date('2026-10-09T01:00:00Z'),
      ended_at: new Date('2026-10-09T01:12:00Z'),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // 3. Insert its players (completed and incomplete)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('game_sessions', { join_pin: '418231' }, {});
  }
};
