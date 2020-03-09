"use strict";
module.exports = (sequelize, DataTypes) => {
  const detail_orders = sequelize.define(
    "detail_order",
    {
      code: DataTypes.STRING, //code booking
      ticket_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER
    },
    {}
  );
  detail_orders.associate = function(models) {
    // associations can be defined here
    detail_orders.belongsTo(models.order, {
      // as: "createdBy",
      foreignKey: "order_id"
    });
    detail_orders.belongsTo(models.ticket, {
      // as: "createdBy",
      foreignKey: "ticket_id"
    });
  };
  return detail_orders;
};
