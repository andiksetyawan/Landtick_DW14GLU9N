const moment = require("moment-timezone");
const models = require("../models");
// const Pet = models.pet;
// const Species = models.species;
const Ticket = models.ticket;
const Train = models.train;
const Station = models.station;
const Class = models.class;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findOne({
      where: { id },
      attributes: {
        exclude: ["train_id", "start_station_id", "destination_station_id"]
      }
    });
    if (ticket) {
      res.json({
        success: true,
        message: "Ticket was successfully loaded",
        data: ticket
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
  //endpoint
  //http://localhost:5000/api/v1/tickets?start_time=2020-03-06&end_time=2020-03-07
  //http://localhost:5000/api/v1/tickets?start_time=2020-03-06

  const { start_time } = req.query;

  const start_day_jakarta_to_utc = moment(start_time)
    .tz("Asia/Jakarta")
    .startOf("day")
    .utc()
    .toDate();

  let end_day_jakarta_to_utc;
  if (req.query.end_time) {
    end_day_jakarta_to_utc = moment(req.query.end_time)
      .tz("Asia/Jakarta")
      .endOf("day")
      .utc()
      .toDate();
  } else {
    end_day_jakarta_to_utc = moment(start_time)
      .tz("Asia/Jakarta")
      .endOf("day")
      .utc()
      .toDate();
  }

  console.log(start_day_jakarta_to_utc);
  console.log(end_day_jakarta_to_utc);

  try {
    const ticket = await Ticket.findAll({
      order: [["startTime", "ASC"]],
      where: {
        startTime: {
          [Op.gte]: start_day_jakarta_to_utc,
          [Op.lte]: end_day_jakarta_to_utc
        }
        // startTime: start_time
      },
      attributes: {
        exclude: ["train_id", "start_station_id", "destination_station_id"]
      },
      include: [
        {
          model: Train,
          attributes: {
            exclude: ["class_id"]
          }
          // as: "spesies"
        },
        {
          model: Class
          // attributes: ["id", "name"]
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
    });
    if (ticket) {
      res.json({
        success: true,
        message: "Tickets was successfully loaded",
        data: ticket
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Load Tickets data failed",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Load Tickets data failed, something went wrong",
      data: {}
    });
  }
};

exports.search = async (req, res) => {
  //endpoint
  //http://localhost:5000/api/v1/tickets?start_time=2020-03-06&end_time=2020-03-07
  //http://localhost:5000/api/v1/tickets?start_time=2020-03-06

  const {
    startTime,
    start_station_id,
    destination_station_id,
    // qty
  } = req.query;

  console.log("query======", req.query.startTime);

  const start_time_jakarta_to_utc = moment(startTime)
    .tz("Asia/Jakarta")
    //.startOf("day")
    .utc()
    .toDate();

  console.log("======", start_time_jakarta_to_utc);


  let end_day_jakarta_to_utc;
  if (req.query.end_time) {
    end_day_jakarta_to_utc = moment(req.query.end_time)
      .tz("Asia/Jakarta")
      .endOf("day")
      .utc()
      .toDate();
  } else {
    end_day_jakarta_to_utc = moment(startTime)
      .tz("Asia/Jakarta")
      .endOf("day")
      .utc()
      .toDate();
  }

  console.log(start_time_jakarta_to_utc);
  console.log(end_day_jakarta_to_utc);

  try {
    const ticket = await Ticket.findAll({
      order: [["startTime", "ASC"]],
      where: {
        startTime: {
          [Op.gte]: start_time_jakarta_to_utc,
          [Op.lte]: end_day_jakarta_to_utc
        },
        start_station_id,
        destination_station_id,
        // qty: {
        //   [Op.gte]: qty
        // }
        // startTime: start_time
      },
      attributes: {
        exclude: ["train_id", "start_station_id", "destination_station_id"]
      },
      include: [
        {
          model: Train,
          attributes: {
            exclude: ["class_id"]
          }
          // as: "spesies"
        },
        {
          model: Class
          // attributes: ["id", "name"]
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
    });
    if (ticket) {
      if (ticket.length > 0) {
        res.json({
          success: true,
          message: "Tickets was successfully loaded",
          data: ticket
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Maaf, Tiket tidak tersedia. Silahkan coba cek jadwal lain",
          data: {}
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Load Tickets data failed",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Load Tickets data failed, something went wrong",
      data: {}
    });
  }
};

exports.create = async (req, res) => {
  console.log("body add data", req.body);
  const { dateStart } = req.body;

  console.log("datestart body", dateStart);
  const new_date_start = moment(dateStart)
    .tz("Asia/Jakarta")
    .startOf("day")
    .utc()
    .toDate(); //change to start day from client to utc

  console.log(new_date_start);
  req.body.dateStart = new_date_start;

  console.log("body add data 222222", req.body);

  try {
    const ticket = await Ticket.create(req.body);
    console.log("tiket create", ticket);
    res.json({
      success: true,
      message: "Adding new ticket was successfully created",
      data: ticket
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      success: false,
      message: "Add Ticket failed, something went wrong",
      data: {}
    });
  }
};

// exports.update = async (req, res) => {
//   console.log(req.params);

//   const { id } = req.params;
//   // req.body.breeder = req.body.name;
//   // console.log("body", req.body);

//   try {
//     const check_user = await User.findOne({ where: { id } });
//     //  console.log("cekuser", check_user);
//     if (check_user) {
//       //console.log(check_user.id + "===" + req.user);
//       if (check_user.id === req.user) {
//         const userq = await User.update(req.body, {
//           where: { id }
//         });

//         console.log("petq", userq);
//         if (userq.length > 0 && userq[0]) {
//           const user = await User.findOne({
//             where: { id },
//             attributes: { exclude: ["password", "level", "email", "id"] }
//           });

//           res.json({
//             success: true,
//             message: "User was successfully updated",
//             data: user
//           });
//         } else {
//           res.status(401).json({
//             success: false,
//             message: "update User fail",
//             data: {}
//           });
//         }
//       } else {
//         res.status(401).json({
//           success: false,
//           message: "Not authorized",
//           data: {}
//         });
//       }
//     } else {
//       res.status(401).json({
//         success: false,
//         message: "Not authorized",
//         data: {}
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({
//       success: false,
//       message: "Update User data failed, something went wrong",
//       data: {}
//     });
//   }
// };

// exports.destroy = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.destroy({ where: { id } });
//     if (user) {
//       res.json({
//         success: true,
//         message: "User was successfully deleted",
//         data: { id }
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "delete user fail",
//         data: {}
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(404).json({
//       success: false,
//       message: "Delete User data failed, something went wrong",
//       data: {}
//     });
//   }
// };
