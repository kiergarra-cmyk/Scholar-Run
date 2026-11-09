'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        school_id: '2099-0001',
        name: 'John Doe',
        email: 'johndoe.test',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add other demo users here as needed
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
