"use strict";
module.exports = (sequelize, DataTypes) => {
  const station = sequelize.define(
    "station",
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {}
  );
  station.associate = function(models) {
    // associations can be defined here
    // train.belongsTo(models.type, {
    //   // as: "createdBy",
    //   foreignKey: "typeId"
    // });
  };
  return station;
};
