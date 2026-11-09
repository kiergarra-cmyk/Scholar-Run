'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Insert a parent question first so the foreign key exists
    await queryInterface.bulkInsert('questions', [
      {
        question_id: 1, // Optional if auto-incrementing, but matches your choice foreign key
        question_text: 'Sample Library Question',
        points: 10,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], { ignoreDuplicates: true });

    // 2. Then insert your question choices
    await queryInterface.bulkInsert('question_choices', [
      {
        question_id: 1,
        choice_text: 'Sample Choice A',
        choice_order: 1,
        is_correct: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        question_id: 1,
        choice_text: 'Sample Choice B',
        choice_order: 2,
        is_correct: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('question_choices', null, {});
    await queryInterface.bulkDelete('questions', null, {});
  }
};