import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./context/AuthContext.jsx";
import { CustomerProvider } from "./context/shopContext/customer/CustomerContext.jsx";
import { ProductsProvider } from "./context/shopContext/product/productContext.jsx";
import { CartProvider } from "./context/shopContext/cart/cart.context.jsx";

import { Provider } from "react-redux";
import { store } from "./store/store.js";

import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <ProductsProvider>
          <CustomerProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CustomerProvider>
        </ProductsProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
