"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      train_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "trains",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      class_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "classes",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      dateStart: {
        type: Sequelize.DATE,
        allowNull: false
      },
      start_station_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "stations",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      destination_station_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "stations",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tickets");
  }
};
