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
import AdminRoutes,{Publicroutes} from "./utils/AdminRoutes";
import Shop from "./pages/shop/shop/Shop";
import Home from "./pages/shop/home/Home";
import Checkout from "./pages/shop/checkout/Checkout";
import MainShopLayout from "./layouts/MainShopLayout";
import ValidatedAccount from "./components/shop/validateAccount/ValidatedAccount";
import SignUpForm from "./components/shop/customerAuth/SignUpForm/SignUpForm";
import SignInForm from "./components/shop/customerAuth/SignInForm/SignInForm";
import ProductDetails from "./pages/shop/productDetails/ProductDetails";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/shop" element={ <MainShopLayout /> } >
                    <Route index element={<Home />}/>
                    <Route path="products" element={<Shop />}/>
                    <Route path="products/:id" element={<ProductDetails />}/>
                    <Route path="signIn" element={<SignInForm />}/>
                    <Route path="signUp" element={<SignUpForm />}/>
                    <Route path="checkout" element={<Checkout />} />
                </Route>

                {/* Customer Validation Route  */}
                <Route path="/validate/:id" element={<ValidatedAccount />}/>

                <Route element={<Publicroutes/>}>
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<AdminRoutes/>}>
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
