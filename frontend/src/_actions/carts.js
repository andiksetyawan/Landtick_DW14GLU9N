import { ADD_CARTS, ADD_CART, ADD_RETURN_CART } from "../config/constants";

export const addCarts = data => {
  console.log("dattaa action add cart", data);
  return {
    type: ADD_CARTS,
    payload: data
  };
};

export const addCart = data => {
  console.log("dattaa action add cart", data);
  return {
    type: ADD_CART,
    payload: data
  };
};

export const addReturnCart = data => {
  console.log("dattaa action add return cart", data);
  return {
    type: ADD_RETURN_CART,
    payload: data
  };
};
