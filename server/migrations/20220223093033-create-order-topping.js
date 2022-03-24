'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_toppings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_order_toping: {
        type: Sequelize.INTEGER,
        references: {
          model: "order_lists",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_toppings: {
        type: Sequelize.INTEGER,
        references: {
          model: "toppings",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_toppings');
  }
};