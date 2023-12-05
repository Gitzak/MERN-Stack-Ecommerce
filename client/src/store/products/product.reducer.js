import { PRODUCT_ACTION_TYPES } from "./product.types";

const PRODUCT_INITIAL_STATE = {
  currentProducts: [],
  productDetail: null
};

export const productsReducer = (state = PRODUCT_INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_ACTION_TYPES.SET_CURRENT_PRODUCTS:
      return {
        ...state,
        currentProducts: payload,
      };
    case PRODUCT_ACTION_TYPES.SET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: payload,
      };
    default:
      return state;
  }
};
