import { GET_ORDERS, RESET_ORDERS } from "../config/constants";

const initState = {
  data: null,
  loading: false,
  error: null
};

const orders = (state = initState, action) => {
  switch (action.type) {
    case `${GET_ORDERS}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null
      };
    case `${GET_ORDERS}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };
    case `${GET_ORDERS}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload.response
          ? action.payload.response.data.message
          : action.payload.message
      };
    case RESET_ORDERS:
      console.log("reset order reducer");
      return initState;
    default:
      return state;
  }
};

export default orders;
