import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import NavBar from "../components/shop1/navBar";
import '../assets/css/shopLayout.css'
const ShopLayout = () => {
    return (
        <div className="shopLayout">
           <NavBar>
            <Outlet />
           </NavBar>
        </div>
    );
};

export default ShopLayout;
