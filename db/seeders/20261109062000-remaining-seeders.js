'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

   // 1. Questions
    await queryInterface.bulkInsert('questions', [
      { 
        question_id: 1, 
        question_text: 'Sample Question', 
        points: 10, 
        created_at: now, 
        updated_at: now 
      }
    ], { ignoreDuplicates: true });

    // 2. Question Choices
    await queryInterface.bulkInsert('question_choices', [
      { 
        choice_id: 1, 
        question_id: 1, 
        choice_text: 'Sample Choice', 
        is_correct: true, 
        created_at: now, 
        updated_at: now 
      }
    ], { ignoreDuplicates: true });

    // 3. Location Routes
    await queryInterface.bulkInsert('location_routes', [
      { 
        route_id: 1, 
        from_location_id: 1, 
        to_location_id: 1, 
        created_at: now, 
        updated_at: now 
      }
    ], { ignoreDuplicates: true });

    // 4. Tournament Sessions
    await queryInterface.bulkInsert('tournament_sessions', [
      { 
        session_id: 1, 
        host_id: 1, 
        status: 'active', 
        created_at: now, 
        updated_at: now 
      }
    ], { ignoreDuplicates: true });

    // 5. Session Players
    await queryInterface.bulkInsert('session_players', [
      { 
        session_id: 1, 
        user_id: 1, 
        created_at: now, 
        updated_at: now 
      }
    ], { ignoreDuplicates: true });

    // 6. Runs
    await queryInterface.bulkInsert('runs', [
      { 
        run_id: 1, 
        session_id: 1, 
        player_id: 1, 
        created_at: now, 
        updated_at: now 
      }
    ], { ignoreDuplicates: true });

    // 7. Run Locations
    await queryInterface.bulkInsert('run_locations', [
      { 
        run_id: 1, 
        location_id: 1, 
        created_at: now, 
        updated_at: now 
      }
    ], { ignoreDuplicates: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('run_locations', null, {});
    await queryInterface.bulkDelete('runs', null, {});
    await queryInterface.bulkDelete('session_players', null, {});
    await queryInterface.bulkDelete('tournament_sessions', null, {});
    await queryInterface.bulkDelete('location_routes', null, {});
    await queryInterface.bulkDelete('question_choices', null, {});
    await queryInterface.bulkDelete('questions', null, {});
  }
};