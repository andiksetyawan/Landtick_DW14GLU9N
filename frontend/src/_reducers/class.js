import { GET_CLASSES } from "../config/constants";

const initState = {
  data: [],
  loading: false,
  error: null
};

const class_ticket = (state = initState, action) => {
  switch (action.type) {
    case `${GET_CLASSES}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null
      };
    case `${GET_CLASSES}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };
    case `${GET_CLASSES}_REJECTED`:
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

export default class_ticket;
