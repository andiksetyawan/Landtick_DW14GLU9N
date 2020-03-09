import { API, setAuthToken } from "../config/api";
import {
  ADD_ORDER,
  GET_ORDER,
  RESET_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER
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

export const updateOrder = (data, id) => {
  console.log("masuk updateOrder actions");
  const token = localStorage.getItem("token");
  return {
    type: UPDATE_ORDER,
    payload: async () => {
      setAuthToken(token);
      const res = await API.patch("/order/" + id, data);
      console.log("ressss updateOrder", res.data.data);
      return res.data.data;
    }
  };
};

export const deleteOrder = id => {
  console.log("masuk deleteOrder actions");
  const token = localStorage.getItem("token");
  return {
    type: DELETE_ORDER,
    payload: async () => {
      setAuthToken(token);
      const res = await API.delete("/order/" + id);
      console.log("ressss delete", res.data.data);
      return res.data.data;
    }
  };
};

export const updateProofOrder = (image, id) => {
  console.log("masuk upda proof Order actions", image);
  const token = localStorage.getItem("token");
  //console.log("token",token);
  const formData = new FormData();
  formData.append("image", image);
  return {
    type: UPDATE_ORDER,
    payload: async () => {
      setAuthToken(token);
      const res = await API.post("/order/proof/" + id, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("ressss UPDATE proof order", res.data.data);
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
