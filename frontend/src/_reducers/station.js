import { GET_STATIONS } from "../config/constants";

const initState = {
  data: [],
  loading: false,
  error: null
};

const station = (state = initState, action) => {
  switch (action.type) {
    case `${GET_STATIONS}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null
      };
    case `${GET_STATIONS}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };
    case `${GET_STATIONS}_REJECTED`:
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

export default station;
