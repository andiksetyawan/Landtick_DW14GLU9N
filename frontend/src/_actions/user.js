import { API, setAuthToken } from "../config/api";
import { GET_USER } from "../config/constants";

export const getUser = () => {
  console.log("masuk get specie actions");
  const token = localStorage.getItem("token");
  return {
    type: GET_USER,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("/user");
      console.log("ressss Users", res.data.data);
      return res.data.data;
    }
  };
};
