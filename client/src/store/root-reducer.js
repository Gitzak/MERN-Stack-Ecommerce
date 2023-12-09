import { combineReducers } from "redux";
import { customerReducer } from "./customer/customer.reducer";
import { productsReducer } from "./products/product.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { userReducer } from "./user/user.reducer";


export const rootReducer = combineReducers({
    customer: customerReducer,
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    // categories: categoriesReducer,
})