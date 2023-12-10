// Test 1 : 
// export const selectBestSeller = createSelector(
//   [selectBestSellerReducer],
//   (products) => products.currentProducts
// );

// product.action.js

// export const setCurrentProducts = (products, tab) => {
//   return {
//     type: "SET_CURRENT_PRODUCTS",
//     payload: { products, tab },
//   };
// };

// export const selectProductDetail = createSelector(
//   [selectproductsReducer],
//   (products) => products.productDetail
// );



// TesT 2
// import { createSelector } from "reselect";

// // products
// const selectproductsReducer = (state) => state.products;

// // best seller products
// const selectBestSellerReducer = (state) => state.products.bestSeller;
// const selectRecommendedReducer = (state) => state.products.bestSeller;
// const selectNewArrivalReducer = (state) => state.products.bestSeller;

// export const selectCurrentProducts = createSelector(
//     [selectproductsReducer],
//     [selectBestSellerReducer],
//     [selectRecommendedReducer],
//     [selectNewArrivalReducer],
//     (products) => products.currentProducts
// );

import { createSelector } from "reselect";

// products
// const selectProductsReducer = (state) => state.products.currentProducts;
const selectProductsReducer = (state) => state.products;


// best seller products
const selectBestSellerReducer = (state) => state.products.bestSeller;
const selectRecommendedReducer = (state) => state.products.recommended; // Update this line
const selectNewArrivalReducer = (state) => state.products.newArrival; // Update this line

export const selectCurrentProducts = createSelector(
    [selectProductsReducer, selectBestSellerReducer, selectRecommendedReducer, selectNewArrivalReducer],
    (products, bestSeller, recommended, newArrival) => ({
        currentProducts: products,
        bestSeller: bestSeller,
        recommended: recommended,
        newArrival: newArrival,
    })
);

export const selectProductDetail = createSelector(
  [selectProductsReducer],
  (products) => products.productDetail
);