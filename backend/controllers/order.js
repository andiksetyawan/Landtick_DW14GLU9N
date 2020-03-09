require("dotenv").config();
const models = require("../models");
const Order = models.order;
const DetailOrder = models.detail_order;
const Passenger = models.passenger;
const Ticket = models.ticket;
const User = models.user;
const Train = models.train;
const Class = models.class;
const Station = models.station;

exports.create = async (req, res) => {
  //const  user = req.body;
  console.log("body", req.body);
  // const { pet } = req.body;
  models.sequelize
    .transaction(async t => {
      try {
        //check qty ticket

        const ticket = await Ticket.findOne({
          where: { id: req.body.departure }
        });
        if (ticket) {
          const stok_ticket = ticket.qty;
          if (stok_ticket < req.body.qty) {
            throw new Error("stock");
          } else {
            const data_order = {
              invoice: "1234INV11111111111111",
              user_id: 1, /////GANTI
              total: 600000
            };
            const order = await Order.create(data_order, { transaction: t });

            const data_detail_order = [
              {
                code: "BOO1234",
                order_id: order.id,
                ticket_id: req.body.departure, //departure ticket id
                qty: req.body.qty
              }
            ];

            if (req.body.return) {
              data_detail_order.push({
                code: "BOO12351111",
                order_id: order.id,
                ticket_id: req.body.return, //departure ticket id
                qty: req.body.qty
              });
            }

            console.log("data_detail_order", data_detail_order);
            const detailOrder = await DetailOrder.bulkCreate(
              data_detail_order,
              {
                transaction: t
              }
            );
            const data_passengers = req.body.passengers.map(item => {
              return {
                name: item.name,
                id_number: item.id_number,
                email: item.email,
                type: item.type,
                order_id: order.id
              };
            });
            const passenger = await Passenger.bulkCreate(data_passengers, {
              transaction: t
            });

            //update ticket
            const qty_ = stok_ticket - req.body.qty;
            const update_ticket_departure = await Ticket.update(
              { qty: qty_ },
              { transaction: t, where: { id: req.body.departure } }
            );

            if (req.body.return) {
              const ticket_return = await Ticket.findOne({
                where: { id: req.body.departure }
              });
              if (ticket_return && ticket_return.qty >= req.body.qty) {
                //UPDATE STOCK return Ticket
                const update_ticket_return = await Ticket.update(
                  { qty: ticket_return.qty - req.body.qty },
                  { transaction: t, where: { id: req.body.return } }
                );
              } else {
                throw new Error("stock");
              }
            }
            return { order, detailOrder, passenger, update_ticket_departure };
          }
        } else {
          console.log("tdk ada tiket departute");
          // throw new Error();
          throw new Error("stock");
        }

        //update ticket
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .then(data => {
      res.json({
        success: true,
        message: "Your account was successfully created",
        data
      });
    })
    .catch(err => {
      // Transaction has been rolled back
      console.log("errrrrrr", err.message);
      if (err.message == "stock") {
        res.status(400).json({
          success: false,
          message: "Maaf saat ini stok tiket tidak mencukupi",
          data: {}
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Gagal booking ticket",
          data: {}
        });
      }
    });
};

exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({
      where: { id },
      include: [
        {
          model: DetailOrder,
          include: [
            {
              model: Ticket,
              include: [
                {
                  model: Train
                  // as: "spesies"
                  //  attributes: ["id", "name"]
                },
                {
                  model: Class
                  // as: "spesies"
                  //  attributes: ["id", "name"]
                },
                {
                  model: Station,
                  as: "startStation"
                  // attributes: ["id", "name"]
                },
                {
                  model: Station,
                  as: "destinationStation"
                  // attributes: ["id", "name"]
                }
              ]
              // as: "spesies"
              //  attributes: ["id", "name"]
            }
          ]
          // as: "spesies"
          //  attributes: ["id", "name"]
        },
        {
          model: User
          // as: "user"
          //  attributes: ["id", "name", "address", "phone"]
        },
        {
          model: Passenger
          // as: "user"
          //  attributes: ["id", "name", "address", "phone"]
        }
      ]

      // through: {
      //   model: DetailOrder,
      //   // where: { is_done: false },
      //   // attributes: { exclude: ["createdAt", "updatedAt"] }
      // }
      // attributes: {
      //   exclude: ["train_id", "start_station_id", "destination_station_id"]
      // }
    });
    if (order) {
      res.json({
        success: true,
        message: "Ticket was successfully loaded",
        data: order
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Ticket Train data failed",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Load Ticket data failed, something went wrong",
      data: {}
    });
  }
};

//shows by user
exports.showsByUser = async (req, res) => {
  //const { id } = req.params;
  console.log("req", req.user);
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user },
      include: [
        {
          model: DetailOrder,
          include: [
            {
              model: Ticket,
              include: [
                {
                  model: Train
                  // as: "spesies"
                  //  attributes: ["id", "name"]
                },
                {
                  model: Class
                  // as: "spesies"
                  //  attributes: ["id", "name"]
                },
                {
                  model: Station,
                  as: "startStation"
                  // attributes: ["id", "name"]
                },
                {
                  model: Station,
                  as: "destinationStation"
                  // attributes: ["id", "name"]
                }
              ]
              // as: "spesies"
              //  attributes: ["id", "name"]
            }
          ]
          // as: "spesies"
          //  attributes: ["id", "name"]
        },
        {
          model: User
          // as: "user"
          //  attributes: ["id", "name", "address", "phone"]
        },
        {
          model: Passenger
          // as: "user"
          //  attributes: ["id", "name", "address", "phone"]
        }
      ]

      // through: {
      //   model: DetailOrder,
      //   // where: { is_done: false },
      //   // attributes: { exclude: ["createdAt", "updatedAt"] }
      // }
      // attributes: {
      //   exclude: ["train_id", "start_station_id", "destination_station_id"]
      // }
    });
    if (orders) {
      res.json({
        success: true,
        message: "Ticket was successfully loaded",
        data: orders
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Ticket Train data failed",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Load Ticket data failed, something went wrong",
      data: {}
    });
  }
};
