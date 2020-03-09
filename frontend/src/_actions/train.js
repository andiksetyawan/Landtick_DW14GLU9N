import { API, setAuthToken } from "../config/api";
import { GET_TRAINS} from "../config/constants";

export const getTrains = () => {
  console.log("masuk get trains actions");
  return {
    type: GET_TRAINS,
    payload: async () => {
      const res = await API.get("/trains");
      console.log("ressss trains", res.data.data);
      return res.data.data;
    }
  };
};
