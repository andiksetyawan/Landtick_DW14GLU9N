"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      invoice: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      proof_transfer: DataTypes.STRING,
      status: DataTypes.ENUM(["pending", "approved", "cancel"])
    },
    {}
  );
  order.associate = function(models) {
    // associations can be defined here
    order.belongsTo(models.user, {
      // as: "createdBy",
      foreignKey: "user_id"
    });
    order.hasMany(models.detail_order, {
      // through: models.order,
      // as: "detail_orders",
      foreignKey: "order_id"
    });
    order.hasMany(models.passenger, {
      // through: models.order,
      // as: "detail_orders",
      foreignKey: "order_id"
    });
  };
  return order;
};
