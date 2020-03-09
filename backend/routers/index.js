const express = require("express");
const router = express.Router();

//const sequelize = require("sequelize");

const { auth } = require("../middlewares/auth");

const { login, register } = require("../controllers/auth");

const user = require("../controllers/user");
const ticket = require("../controllers/ticket");
const station = require("../controllers/station");
const train = require("../controllers/train");
const class_ticket = require("../controllers/class");
const order = require("../controllers/order");

router.get("/", (req, res) => res.send("homee"));
router.post("/login", login);
router.post("/register", register);

router.get("/user", auth, user.show);

router.get("/ticket", auth, ticket.show);
router.get("/tickets", ticket.shows);
router.get("/tickets/search", ticket.search); //search tickets

router.post("/ticket", ticket.create); //!!! AUTH

router.get("/stations", station.shows);

router.get("/trains", train.shows);

router.get("/classes", class_ticket.shows);

router.post("/order", auth, order.create);
router.get("/orders", auth, order.showsByUser); //myticket
router.get("/order/:id", auth, order.show); //myticket

module.exports = router;
