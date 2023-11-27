import { createAction } from "../../utils/reducer/reducer.utils";
import { PRODUCT_ACTION_TYPES } from "./product.types";

export const setCurrentProducts = (products) =>
  createAction(PRODUCT_ACTION_TYPES.SET_CURRENT_PRODUCTS, products);

  export const setProductDetail = (product) =>
  createAction(PRODUCT_ACTION_TYPES.SET_PRODUCT_DETAIL, product);
