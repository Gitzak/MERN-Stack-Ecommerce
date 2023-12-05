import React from "react";
import { Link } from "react-router-dom";

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
        </ul>
      </nav>
    </div>
  );
};

export default NavMenu;
