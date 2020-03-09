import { GET_DETAIL_ORDER } from "../config/constants";

const initState = {
  data: null,
  loading: false,
  error: null
};

const detail_order = (state = initState, action) => {
  switch (action.type) {
    case `${GET_DETAIL_ORDER}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null
      };
    case `${GET_DETAIL_ORDER}_FULFILLED`:
      console.log("reducer detail order payload",action.payload)
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };
    case `${GET_DETAIL_ORDER}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload.response
          ? action.payload.response.data.message
          : action.payload.message
      };
    default:
      return state;
  }
};

export default detail_order;
