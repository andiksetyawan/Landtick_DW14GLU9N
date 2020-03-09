import { API, setAuthToken } from "../config/api";
import { GET_CLASSES} from "../config/constants";

export const getClasses = () => {
  console.log("masuk get classes actions");
  return {
    type: GET_CLASSES,
    payload: async () => {
      const res = await API.get("/classes");
      console.log("ressss classes", res.data.data);
      return res.data.data;
    }
  };
};
