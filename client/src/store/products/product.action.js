import { createAction } from "../../utils/reducer/reducer.utils";
import { PRODUCT_ACTION_TYPES } from "./product.types";

export const setCurrentProducts = (products) =>
  createAction(PRODUCT_ACTION_TYPES.SET_CURRENT_PRODUCTS, products);

  export const setProductDetail = (product) =>
  createAction(PRODUCT_ACTION_TYPES.SET_PRODUCT_DETAIL, product);

  // product.action.js

export const setNewArrival = (products) =>
createAction(PRODUCT_ACTION_TYPES.SET_NEW_ARRIVAL, products);

export const setBestSeller = (products) =>
createAction(PRODUCT_ACTION_TYPES.SET_BEST_SELLER, products);

export const setRecommendedProducts = (products) =>
createAction(PRODUCT_ACTION_TYPES.SET_RECOMMENDED_PRODUCTS, products);
// s