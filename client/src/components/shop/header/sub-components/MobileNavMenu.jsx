import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const MobileNavMenu = () => {
    return (
        <nav className="offcanvas-navigation" id="offcanvas-navigation">
            <ul>
                <li>
                    <Link to="/shop">Home</Link>
                </li>
                <li>
                    <Link to="/shop/products">Shop</Link>
                </li>
                <li>
                    <Link to="/shop/collections">Collections</Link>
                </li>
                <li>
                    <Link to="/shop/promo">Promo</Link>
                </li>
                <li>
                    <Link to="/shop/about">About</Link>
                </li>
                <li>
                    <Link to="/shop/contact">Contact Us</Link>
                </li>
            </ul>
        </nav>
    );
};

export default MobileNavMenu;
