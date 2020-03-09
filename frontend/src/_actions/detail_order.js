import { API, setAuthToken } from "../config/api";
import { GET_DETAIL_ORDER } from "../config/constants";

export const getDetailOrder = (id) => {
  const token = localStorage.getItem("token");
  return {
    type: GET_DETAIL_ORDER,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("/detail_order/" + id);
      console.log("ressss get detail order", res.data.data);
      return res.data.data;
    }
  };
};
