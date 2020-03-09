"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "trains",
      [
        {
          name: "Mutiara Selatan",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Sembrani",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Argo Bromo Anggrek",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("trains", null, {});
  }
};
