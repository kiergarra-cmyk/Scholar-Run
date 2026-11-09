'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        school_id: '2099-0001',
        name: 'John Doe',
        full_name: 'John Doe',
        role: 'player',
        email: 'johndoe@test.com',
        password_hash: 'hashedpassword123', // Make sure this matches your schema requirements if needed
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Add more users here if needed
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};