"use strict";
module.exports = (sequelize, DataTypes) => {
  const passenger = sequelize.define(
    "passenger",
    {
      id_number: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      order_id: DataTypes.INTEGER,
      type: DataTypes.ENUM(["adult", "infant"])
    },
    {}
  );
  passenger.associate = function(models) {
    // associations can be defined here
    passenger.belongsTo(models.order, {
      // as: "createdBy",
      foreignKey: "order_id"
    });
  };
  return passenger;
};
