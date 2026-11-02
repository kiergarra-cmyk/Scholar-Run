'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('location_routes', {
      location_route_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      from_location_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'locations', key: 'location_id' },
        onDelete: 'CASCADE'
      },
      to_location_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'locations', key: 'location_id' },
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('location_routes');
  }
};
