'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('question_choices', {
      choice_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      question_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'questions', key: 'question_id' },
        onDelete: 'CASCADE'
      },
      choice_text: { type: Sequelize.STRING(255), allowNull: false },
      choice_order: { type: Sequelize.INTEGER, allowNull: false },
      is_correct: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('question_choices');
  }
};
