import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/dashboard/auth/Login";
import { Products } from "./pages/dashboard/product/Products";
import Dashboard from "./pages/dashboard/dashboard/Dashboard";
import { Orders } from "./pages/dashboard/order/Orders";
import MainLayout from "./layouts/MainLayout";
import { OrderDetails } from "./pages/dashboard/order/OrderDetails";
import { Create } from "./pages/dashboard/product/Create";
import { Update } from "./pages/dashboard/product/Update";
import Customers from "./pages/dashboard/customer/Customers";
import Categories from "./pages/dashboard/category/Categories";
import { Users } from "./pages/dashboard/user/Users";
import AdminRoutes, { Publicroutes } from "./utils/AdminRoutes";

import ShopLayout from "./layouts/ShopLayout";
import Home from "./pages/shop/home/Home";
import ProductDetails from "./pages/shop/shop-product/ProductDetails";
import Cart from "./pages/shop/cart/Cart";
import Checkout from "./pages/shop/checkout/Checkout";
import LoginRegister from "./pages/shop/loginRegister/LoginRegister";
import Validation from "./pages/shop/validation/Validation";
import MyAccount from "./pages/shop/myAccount/MyAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/shop" element={<ShopLayout />}>
          <Route path="home" element={<Home />} />
          {/* <Route path="products" element={<AllProducts />}/> */}
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login-register" element={<LoginRegister />} />
          <Route path="my-account" element={<MyAccount />} />
        </Route>

        {/* Customer Validation Route  */}
        <Route path="/validate/:id" element={<Validation />} />

        <Route element={<Publicroutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/dashboard" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="customers" element={<Customers />} />
            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<Create />} />
            <Route path="products/update/:id" element={<Update />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
