'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      question_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      location_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'locations', key: 'location_id' },
        onDelete: 'CASCADE'
      },
      question_text: { type: Sequelize.TEXT, allowNull: false }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('questions');
  }
};'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
