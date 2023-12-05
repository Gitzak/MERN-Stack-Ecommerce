import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/dashboard/auth/Login";
import { Products } from "./pages/dashboard/product/Products";
import Dashboard from "./pages/dashboard/dashboard/Dashboard";
import { Orders } from "./pages/dashboard/order/Orders";
import MainLayout from "./layouts/MainLayout";
import { Create } from "./pages/dashboard/product/Create";
import { Update } from "./pages/dashboard/product/Update";
import Customers from "./pages/dashboard/customer/Customers";
import { Users } from "./pages/dashboard/user/Users";
import AdminRoutes, { Publicroutes } from "./utils/AdminRoutes";
import { UpdateCustomer } from "./pages/dashboard/customer/Update";
import { Profile } from "./pages/dashboard/auth/Profile";
import { Categorie } from "./pages/dashboard/category/Categories";
import { CreateCategory } from "./pages/dashboard/category/Create";
import { UpdateCategory } from "./pages/dashboard/category/Update";
import UserCreate from "./pages/dashboard/user/userCreate";
import DashboardProvider from "./context/dashboardContext";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Publicroutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/dashboard" element={<MainLayout />}>
            <Route index element={<DashboardProvider><Dashboard /></DashboardProvider>} />
            <Route path="users" element={<Users />} />
            <Route path="users/create" element={<UserCreate />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/update/:id" element={<UpdateCustomer />} />
            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<Create />} />
            <Route path="products/update/:id" element={<Update />} />
            <Route path="categories" element={<Categorie />} />
            <Route path="categories/create" element={<CreateCategory />} />
            <Route path="categories/update/:id" element={<UpdateCategory />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
