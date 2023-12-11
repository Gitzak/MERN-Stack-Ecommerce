import React from "react";
import { Link } from "react-router-dom";

<<<<<<< HEAD
const NavMenu = ({ sidebarMenu }) => {
    return (
        <div className="main-menu ">
            <nav>
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
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact Us</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
=======
const NavMenu = () => {
  return (
    <div className=" main-menu ">
      <nav>
        <ul>
          <li>
            <Link to="/shop/home">Home</Link>
          </li>
          <li>
            <Link to="/shop/products">Shop</Link>
          </li>
          <li>
            <Link to="/shop/aboutUs">About </Link>
          </li>
          <li>
            <Link to="/shop/contact">Contact us </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
>>>>>>> yassirShopChange
};

export default NavMenu;
