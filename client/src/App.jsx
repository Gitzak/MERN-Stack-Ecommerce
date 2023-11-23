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
import { UpdateCustomer } from "./pages/dashboard/customer/Update";
import { Profile } from "./pages/dashboard/auth/Profile";

function App() {
  return (
    <Router>
      <Routes>
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
            <Route path="customers/update/:id" element={<UpdateCustomer />} />
            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<Create />} />
            <Route path="products/update/:id" element={<Update />} />
            <Route path="categories" element={<Categories />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
