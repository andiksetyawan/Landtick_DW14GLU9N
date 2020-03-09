"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "classes",
      [
        {
          name: "Eksekutif",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Bisnis",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Ekonomi",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("classes", null, {});
  }
};
