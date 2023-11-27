import { combineReducers } from "redux";
import { customerReducer } from "./customer/customer.reducer";
import { productsReducer } from "./products/product.reducer";
// import { cartReducer } from "./cart/cart.reducer";


export const rootReducer = combineReducers({
    customer: customerReducer,
    prodcuts: productsReducer,
    // categories: categoriesReducer,
    // cart: cartReducer
})