///REDUCER SEARCH TICKET

import { GET_SEARCH, RESET_SEARCH } from "../config/constants";

const initState = {
  data: [],
  loading: false,
  error: null
};

const search = (state = initState, action) => {
  switch (action.type) {
    case `${GET_SEARCH}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null
      };
    case `${GET_SEARCH}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };
    case `${GET_SEARCH}_REJECTED`:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload.response
          ? action.payload.response.data.message
          : action.payload.message
      };
    case RESET_SEARCH:
      return initState;
    default:
      return state;
  }
};

export default search;
