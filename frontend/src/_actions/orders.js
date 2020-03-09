import { API, setAuthToken } from "../config/api";
import { GET_ORDERS, RESET_ORDERS } from "../config/constants";

export const getOrders = () => {
  //console.log("masuk GET Orders / myticket actions");
  const token = localStorage.getItem("token");
  //console.log("token", token);
  return {
    type: GET_ORDERS,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("/orders");
      // console.log("ressss add order", res.data.data);
      return res.data.data;
    }
  };
};

export const getOrdersByUser = () => {
  //console.log("masuk GET Orders / myticket actions");
  const token = localStorage.getItem("token");
  //console.log("token", token);
  return {
    type: GET_ORDERS,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("/orders/user");
      // console.log("ressss add order", res.data.data);
      return res.data.data;
    }
  };
};

export const resetOrders = () => {
  // console.log("reset order reducer action");

  return {
    type: RESET_ORDERS,
    payload: {}
  };
};
