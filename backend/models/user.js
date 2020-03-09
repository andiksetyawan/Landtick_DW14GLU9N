"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      level: DataTypes.ENUM(["user", "admin"]),
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: DataTypes.ENUM(["male", "female"])
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
