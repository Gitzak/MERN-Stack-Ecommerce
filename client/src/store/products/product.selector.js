import { createSelector } from "reselect";

const selectproductsReducer = (state) => state.products;

export const selectCurrentProducts = createSelector(
  [selectproductsReducer],
  (products) => products.currentProducts
);


export const selectProductDetail = createSelector(
  [selectproductsReducer],
  (products) => products.productDetail
);
