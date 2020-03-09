import { GET_TICKETS, RESET_TICKET } from "../config/constants";

const initState = {
  data: [],
  loading: false,
  error: null
};

const ticket = (state = initState, action) => {
  switch (action.type) {
    case `${GET_TICKETS}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null
      };
    case `${GET_TICKETS}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };
    case `${GET_TICKETS}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload.response
          ? action.payload.response.data.message
          : action.payload.message
      };
    case RESET_TICKET:
      return initState;
    default:
      return state;
  }
};

export default ticket;
