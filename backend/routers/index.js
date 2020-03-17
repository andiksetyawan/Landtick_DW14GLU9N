const express = require("express");
const router = express.Router();

//const sequelize = require("sequelize");

const { auth } = require("../middlewares/auth");

const { login, register, autoAuth } = require("../controllers/auth");

const user = require("../controllers/user");
const ticket = require("../controllers/ticket");
const station = require("../controllers/station");
const train = require("../controllers/train");
const class_ticket = require("../controllers/class");
const order = require("../controllers/order");
const detailOrder = require("../controllers/detail_order");

router.get("/", (req, res) => res.send("homee"));
router.post("/login", login);
router.post("/register", register);
router.get("/autoauth", auth, autoAuth);

router.get("/user", auth, user.show);

router.get("/ticket", auth, ticket.show);
router.get("/tickets", ticket.shows);
router.get("/tickets/search", ticket.search); //search tickets

router.post("/ticket", auth, ticket.create); //!!! AUTH

router.get("/stations", station.shows);

router.get("/trains", train.shows);

router.get("/classes", class_ticket.shows);

router.post("/order", auth, order.create);
router.get("/orders/user", auth, order.showsByUser); //myticket
router.get("/orders", auth, order.shows); //myticket
router.get("/order/:id", auth, order.show); //myticket
router.post("/order/proof/:id", auth, order.updateProofTransfer);
router.get("/detail_order/:id", detailOrder.show);

router.patch("/order/:id", auth, order.update);
router.delete("/order/:id", auth, order.destroy);

module.exports = router;
