import { ADD_ORDER, GET_ORDERS, GET_ORDER, RESET_ORDER } from "../config/constants";

const initState = {
  data: null,
  loading: false,
  error: null
};

const order = (state = initState, action) => {
  switch (action.type) {
    case `${ADD_ORDER}_PENDING`:
    case `${GET_ORDERS}_PENDING`:
    case `${GET_ORDER}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null
      };
    case `${ADD_ORDER}_FULFILLED`:
    case `${GET_ORDERS}_FULFILLED`:
    case `${GET_ORDER}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };
    case `${ADD_ORDER}_REJECTED`:
    case `${GET_ORDERS}_REJECTED`:
    case `${GET_ORDER}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload.response
          ? action.payload.response.data.message
          : action.payload.message
      };
    case RESET_ORDER:
      console.log("reset order reducer");
      return initState;
    default:
      return state;
  }
};

export default order;
