import { API, setAuthToken } from "../config/api";
import {
  ADD_ORDER,
  GET_ORDERS,
  GET_ORDER,
  RESET_ORDER
} from "../config/constants";

export const addOrder = data => {
  console.log("masuk addOrder actions");
  const token = localStorage.getItem("token");
  return {
    type: ADD_ORDER,
    payload: async () => {
      setAuthToken(token);
      const res = await API.post("/order", data);
      console.log("ressss add order", res.data.data);
      return res.data.data;
    }
  };
};

export const getOrders = () => {
  console.log("masuk GET Orders / myticket actions");
  const token = localStorage.getItem("token");
  console.log("token", token);
  return {
    type: GET_ORDERS,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("/orders");
      console.log("ressss add order", res.data.data);
      return res.data.data;
    }
  };
};

export const getOrder = id => {
  //console.log("masuk GET Orders / myticket actions");
  const token = localStorage.getItem("token");
  //console.log("token",token);
  return {
    type: GET_ORDER,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("/order/" + id);
      console.log("ressss get order", res.data.data);
      return res.data.data;
    }
  };
};

export const resetOrder = () => {
  console.log("reset order reducer action");

  return {
    type: RESET_ORDER,
    payload: {}
  };
};
