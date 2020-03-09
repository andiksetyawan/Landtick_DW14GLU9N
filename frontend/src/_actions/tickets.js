import { API, setAuthToken } from "../config/api";
import { GET_TICKETS } from "../config/constants";
import moment from "moment";

export const getTickets = () => {
  const today = moment().format("YYYY-MM-DD");
  return {
    type: GET_TICKETS,
    payload: async () => {
      const res = await API.get("/tickets?start_time=" + today);
      console.log("ressss tickets", res.data.data);
      return res.data.data;
    }
  };
};


