import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import logger from "redux-logger";

import auth from "../_reducers/auth";
import user from "../_reducers/user";
import train from "../_reducers/train";
import ticket from "../_reducers/ticket";
import station from "../_reducers/station";
import class_ticket from "../_reducers/class";
import search from "../_reducers/search";
import carts from "../_reducers/carts";
import order from "../_reducers/order";

const reducers = combineReducers({
  auth,
  user,
  ticket,
  station,
  train,
  class_ticket,
  search,
  carts,
  order
});

const store = createStore(reducers, applyMiddleware(promise, logger));

export default store;
