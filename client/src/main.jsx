import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./context/AuthContext.jsx";
import { CustomerProvider } from "./context/shopContext/CustomerContext.jsx";
import { ProductsProvider } from "./context/shopContext/productContext.jsx";

import { CartProvider } from "./context/shopContext/cartContext.jsx";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ProductsProvider>
        <CustomerProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CustomerProvider>
      </ProductsProvider>
    </UserProvider>
  </React.StrictMode>
);
