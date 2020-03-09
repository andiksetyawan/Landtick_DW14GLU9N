"use strict";
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define(
    "ticket",
    {
      train_id: DataTypes.INTEGER,
      class_id: DataTypes.INTEGER,
      dateStart: DataTypes.DATE,
      start_station_id: DataTypes.INTEGER,
      startTime: DataTypes.DATE,
      destination_station_id: DataTypes.INTEGER,
      arrivalTime: DataTypes.DATE,
      price: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  ticket.associate = function(models) {
    // associations can be defined here
    ticket.belongsTo(models.train, {
      // as: "createdBy",
      foreignKey: "train_id"
    });
    ticket.belongsTo(models.class, {
      // as: "createdBy",
      foreignKey: "class_id"
    });
    ticket.belongsTo(models.station, {
      as: "startStation",
      foreignKey: "start_station_id"
    });
    ticket.belongsTo(models.station, {
      as: "destinationStation",
      foreignKey: "destination_station_id"
    });
  };
  return ticket;
};
