// import { PRODUCT_ACTION_TYPES } from "./product.types";

import { PRODUCT_ACTION_TYPES } from "./product.types";

// const PRODUCT_INITIAL_STATE = {
//   currentProducts: [],
//   productDetail: null
// };

// export const productsReducer = (state = PRODUCT_INITIAL_STATE, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case PRODUCT_ACTION_TYPES.SET_CURRENT_PRODUCTS:
//       return {
//         ...state,
//         currentProducts: payload,
//       };
//     case PRODUCT_ACTION_TYPES.SET_PRODUCT_DETAIL:
//       return {
//         ...state,
//         productDetail: payload,
//       };
//     default:
//       return state;
//   }
// };

// product.reducer.js

const initialState = {
    currentProducts: [],
    productDetail: null,
    newArrival: [],
    bestSeller: [],
    recommended: [],
    // other properties...
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_ACTION_TYPES.SET_NEW_ARRIVAL:
            return {
                ...state,
                newArrival: action.payload,
            };
        case PRODUCT_ACTION_TYPES.SET_BEST_SELLER:
            return {
                ...state,
                bestSeller: action.payload,
            };
        case PRODUCT_ACTION_TYPES.SET_RECOMMENDED_PRODUCTS:
            return {
                ...state,
                recommended: action.payload,
            };
        case PRODUCT_ACTION_TYPES.SET_CURRENT_PRODUCTS:
            return {
                ...state,
                currentProducts: action.payload,
            };
        case PRODUCT_ACTION_TYPES.SET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.payload,
            };

        // case PRODUCT_ACTION_TYPES.SET_CURRENT_PRODUCTS:
        //       return {
        //         ...state,
        //         currentProducts: payload,
        //       };
        //     case PRODUCT_ACTION_TYPES.SET_PRODUCT_DETAIL:
        //       return {
        //         ...state,
        //         productDetail: payload,
        //       };

        // other cases...
        default:
            return state;
    }
};
