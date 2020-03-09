import { GET_TRAINS } from "../config/constants";

const initState = {
  data: [],
  loading: false,
  error: null
};

const train = (state = initState, action) => {
  switch (action.type) {
    case `${GET_TRAINS}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null
      };
    case `${GET_TRAINS}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };
    case `${GET_TRAINS}_REJECTED`:
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

export default train;
