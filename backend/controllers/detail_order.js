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

exports.show = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await DetailOrder.findOne({
      where: { id },
      include: [
        {
          model: Order,
          include: [Passenger]
        },
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
        }
      ]
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
