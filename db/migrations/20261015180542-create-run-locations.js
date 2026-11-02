'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('run_locations', {
      run_location_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      run_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'runs', key: 'run_id' },
        onDelete: 'CASCADE'
      },
      location_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'locations', key: 'location_id' },
        onDelete: 'CASCADE'
      },
      sequence_number: { type: Sequelize.INTEGER, allowNull: false }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('run_locations');
  }
};
