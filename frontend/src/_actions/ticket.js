import { API, setAuthToken } from "../config/api";
import { ADD_TICKET } from "../config/constants";

export const addTicket = data => {
  return {
    type: ADD_TICKET,
    payload: async () => {
      const res = await API.post("/ticket", data);
      console.log("ressss tickets", res.data.data);
      return res.data.data;
    }
  };
};
