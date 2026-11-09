'use strict';

module.exports = {
  async up(queryInterface) {
    const db = queryInterface.sequelize;
    
    // 1. Find the parent host created by the earlier user/host seeder
    const [hosts] = await db.query("SELECT host_id FROM hosts LIMIT 1");
    
    // --> THIS IS NUMBER 2: The safety check
    if (!hosts || hosts.length === 0) {
      console.log("Skipping tournament session seeding: No hosts found yet.");
      return;
    }
    
    const host = hosts[0];

    // 2. Insert a tournament session that has ended / closed
    await queryInterface.bulkInsert('tournament_sessions', [{
      host_id: host.host_id,
      status: 'CLOSED',
      max_players: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tournament_sessions', { status: 'CLOSED' }, {});
  }
};