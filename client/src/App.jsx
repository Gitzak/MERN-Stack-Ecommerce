import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Shop Routes
import ShopLayout from "./layouts/ShopLayout";
import Home from "./pages/shop/home/Home";
import ShopProducts from "./pages/shop/allProducts/ShopProducts";
import ProductDetails from "./pages/shop/shop-product/ProductDetails";
import Cart from "./pages/shop/cart/Cart";
import Checkout from "./pages/shop/checkout/Checkout";
import LoginRegister from "./pages/shop/loginRegister/LoginRegister";
import Validation from "./pages/shop/validation/Validation";
import MyAccount from "./pages/shop/myAccount/MyAccount";

// Public Routes
import { Publicroutes } from "./utils/AdminRoutes";
import { Login } from "./pages/dashboard/auth/Login";

// Admin Routes
import AdminRoutes from "./utils/AdminRoutes";
import MainLayout from "./layouts/MainLayout";
import DashboardProvider from "./context/dashboardContext";
import Dashboard from "./pages/dashboard/dashboard/Dashboard";
import { Users } from "./pages/dashboard/user/Users";
import UserCreate from "./pages/dashboard/user/userCreate";
import { Orders } from "./pages/dashboard/order/Orders";
import Customers from "./pages/dashboard/customer/Customers";
import { UpdateCustomer } from "./pages/dashboard/customer/Update";
import { Products } from "./pages/dashboard/product/Products";
import { Create } from "./pages/dashboard/product/Create";
import { Update } from "./pages/dashboard/product/Update";
import { Categorie } from "./pages/dashboard/category/Categories";
import { CreateCategory } from "./pages/dashboard/category/Create";
import { UpdateCategory } from "./pages/dashboard/category/Update";
import { Profile } from "./pages/dashboard/auth/Profile";
import { NotFound } from "./pages/dashboard/errors/NotFound";
import NotFound404 from "./pages/shop/notfound404/NotFound404";
import About from "./pages/shop/aboutUs/aboutUs";
import Contact from "./pages/shop/contact/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/shop" element={<ShopLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products" element={<ShopProducts />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login-register" element={<LoginRegister />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="my-account" element={<MyAccount />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>

        {/* Customer Validation Route  */}
        <Route path="/validate/:id" element={<Validation />} />

        <Route element={<Publicroutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/dashboard" element={<MainLayout />}>
            <Route
              index
              element={
                <DashboardProvider>
                  <Dashboard />
                </DashboardProvider>
              }
            />
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
