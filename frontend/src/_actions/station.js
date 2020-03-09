import { API, setAuthToken } from "../config/api";
import { GET_STATIONS} from "../config/constants";

export const getStations = () => {
  console.log("masuk  getStations actions");
  return {
    type: GET_STATIONS,
    payload: async () => {
      const res = await API.get("/stations");
      console.log("ressss stations", res.data.data);
      return res.data.data;
    }
  };
};
