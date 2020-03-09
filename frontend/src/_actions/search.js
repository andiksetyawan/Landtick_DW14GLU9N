import { API, setAuthToken } from "../config/api";
import { GET_SEARCH } from "../config/constants";
import moment from "moment";

export const getSearch = query => {
  //const today = moment().format("YYYY-MM-DD");
  return {
    type: GET_SEARCH,
    payload: async () => {
      const res = await API.get("/tickets/search?" + query);
      console.log("ressss search tickets", res.data.data);
      return res.data.data;
    }
  };
};
