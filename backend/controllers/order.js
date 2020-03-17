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

const Upload = require("../utils/upload");

const uniqid = require("uniqid");

exports.create = async (req, res) => {
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
            let _total = 0;
            if (req.body.return) {
              const check_price_ticket_return = await Ticket.findOne({
                where: { id: req.body.return }
              });
              _total =
                ticket.price * req.body.qty +
                check_price_ticket_return.price * req.body.qty;
            } else {
              _total = ticket.price * req.body.qty;
            }
            const data_order = {
              invoice: uniqid.time("INV-"),
              user_id: req.user, /////GANTI
              total: _total
            };
            const order = await Order.create(data_order, { transaction: t });

            const data_detail_order = [
              {
                code: uniqid.time("BO-"),
                order_id: order.id,
                ticket_id: req.body.departure, //departure ticket id
                qty: req.body.qty
              }
            ];

            if (req.body.return) {
              data_detail_order.push({
                code: uniqid.time("BO-"),
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
                where: { id: req.body.return }
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
          model: User,
          attributes: ["id", "username", "name", "email", "address"]
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

exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.update(req.body, {
      where: { id }
    });
    if (order && order.length > 0) {
      res.json({
        success: true,
        message: "Ticket was successfully loaded",
        data: order
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Load Ticket data failed, something went wrong",
      data: {}
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.destroy({ where: { id } });
    if (order) {
      res.json({
        success: true,
        message: "order was successfully deleted",
        data: { id }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "delete order fail",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Deleting order data failed, something went wrong",
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
      order: [["createdAt", "DESC"]],
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
                  //  attributes: ["id", "name"]
                },
                {
                  model: Class
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
              //  attributes: ["id", "name"]
            }
          ]
          //  attributes: ["id", "name"]
        },
        {
          model: User
          //  attributes: ["id", "name", "address", "phone"]
        },
        {
          model: Passenger
          //  attributes: ["id", "name", "address", "phone"]
        }
      ]
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

exports.shows = async (req, res) => {
  //const { id } = req.params;
  console.log("req", req.user);
  try {
    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]],
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

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, res, cb) => {
//     cb(null, "../public/img");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now() + file.originalname);
//   }
// });

//const upload = multer({ storage: storage }).single("image");

exports.updateProofTransfer = (req, res) => {
  try {
    const { id } = req.params;
    const upload = Upload.single("image");
    upload(req, res, async err => {
      if (err || !req.file) {
        // console.log("errrrrr ===========", err);
        throw new err();
      }
      console.log("sucesss", res, req);
      const order = await Order.update(
        {
          proof_transfer: req.file.filename,
          status: "checking"
        },
        { where: { id } }
      );
      if (order) {
        const orderq = await Order.findOne({
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
                    },
                    {
                      model: Class
                    },
                    {
                      model: Station,
                      as: "startStation"
                    },
                    {
                      model: Station,
                      as: "destinationStation"
                    }
                  ]
                }
              ]
            },
            {
              model: User,
              attributes: ["id", "username", "name", "email", "address"]
            },
            {
              model: Passenger
            }
          ]
        });
        if (orderq) {
          res.json({
            success: true,
            message: "Order data was successfully update",
            data: orderq
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Order data was successfully update, but something wrong",
            data: {}
          });
        }
      } else {
        res.status(500).json({
          success: false,
          message: "something went wrong",
          data: {}
        });
      }
    });
  } catch (error) {
    console.log("error", error);

    res.status(500).json({
      success: false,
      message: "Update order data failed, something went wrong",
      data: {}
    });
  }
};
