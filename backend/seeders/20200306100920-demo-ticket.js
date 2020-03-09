"use strict";

const moment = require("moment-timezone");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tickets",
      [
        {
          train_id: 1,
          class_id: 1,
          dateStart: moment
            .tz("Asia/Jakarta")
            .startOf("day")
            .utc()
            .toDate(),
          start_station_id: 79,
          startTime: new Date(),
          destination_station_id: 300,
          arrivalTime: new Date(),
          price: 300000,
          qty: 50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          train_id: 1,
          class_id: 1,
          dateStart: moment
            .tz("Asia/Jakarta")
            .startOf("day")
            .utc()
            .toDate(),
          start_station_id: 79,
          startTime: new Date(),
          destination_station_id: 298,
          arrivalTime: new Date(),
          price: 370000,
          qty: 50,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tickets", null, {});
  }
};
