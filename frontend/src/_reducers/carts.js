import { ADD_CARTS, ADD_CART, RESET_CARTS, ADD_RETURN_CART } from "../config/constants";

const initState = {
  passengers: [
    // {
    //   name: "",
    //   email: "asjd",
    //   address: "asfda",
    //   id_card: "12344"
    // }
  ],
  // detail_order: [
  //   // { id_ticket: 1, qty: 2, price, sub_total},
  //   // { id_ticket: 3, qty: 2, price, sub_total}
  // ],
  departure: {
    ticket: {},
    price: 0,
    qty: 0,
    sub_total: 0
  },
  return: {},
  adult: 1,
  infant: 0,
  total: 0,
  loading: false,
  error: null
};

const carts = (state = initState, action) => {
  switch (action.type) {
    case `${ADD_CARTS}`:
      return {
        ...state,
        passengers: action.payload.passengers,
        // detail_order: action.payload.detail_order,
        departure: action.payload.departure,
        return: action.payload.return,
        total: action.payload.total,
        adult: action.payload.adult,
        infant: action.payload.infant,
        loading: false,
        error: null
      };
      case `${ADD_RETURN_CART}`:
        return {
          ...state,
          return: action.payload.return,
          loading: false,
          error: null
        };
    case `${ADD_CART}`:
      return {
        ...state,
        passengers: [...state.passengers, action.payload.passengers],
        detail_order: [...state.detail_order, action.payload.detail_order],
        total: action.payload.total,
        adult: action.payload.adult,
        infant: action.payload.infant,
        loading: false,
        error: null
      };
    case `${RESET_CARTS}`:
      return initState;
    default:
      return state;
  }
};

export default carts;
