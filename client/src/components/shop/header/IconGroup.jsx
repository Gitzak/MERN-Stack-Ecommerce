import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { selectCartItems } from "../../../store/cart/cart.selector";
import {
    logoutCustomer,
    setCurrentCustomer,
} from "../../../store/customer/customer.action";
import { selectCurrentCustomer } from "../../../store/customer/customer.selector";
import { useEffect } from "react";

const IconGroup = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const currentCustomer = useSelector(selectCurrentCustomer);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         const accountDropdown = document.querySelector(".account-dropdown");
    //         const iconCartDropdown = document.querySelector(".icon-cart ~ .menu-cart ");
    
    //         if (
    //             accountDropdown &&
    //             !accountDropdown.contains(event.target) &&
    //             !event.target.classList.contains("account-setting-active")
    //         ) {
    //             // Add a delay before removing the "active" class
    //             setTimeout(() => {
    //                 accountDropdown.classList.remove("active");
    //             }, 1000);
    //         }
    
    //         if (
    //             iconCartDropdown &&
    //             !iconCartDropdown.contains(event.target) &&
    //             !event.target.classList.contains("icon-cart") &&
    //             !event.target.classList.contains("menu-cart")
    //         ) {
    //             // Add a delay before removing the "active" class
    //             setTimeout(() => {
    //                 iconCartDropdown.classList.remove("active");
    //             }, 100);
    //         }
    //     };
    
    //     document.addEventListener("click", handleClickOutside);
    
    //     return () => {
    //         document.removeEventListener("click", handleClickOutside);
    //     };
    // }, []);
    
      


    const signOutCustomer = () => {
        dispatch(logoutCustomer());
        navigate("/shop/login-register");
    };

    const handleClick = (e) => {
        e.currentTarget.nextSibling.classList.toggle("active");
    };

    const triggerMobileMenu = () => {
        const offcanvasMobileMenu = document.querySelector(
            "#offcanvas-mobile-menu"
        );
        offcanvasMobileMenu.classList.add("active");
    };

    return (
        <div className=" header-right-wrap">
            <div className="same-style account-setting d-none d-lg-block">
                <button
                    className="account-setting-active"
                    onClick={(e) => handleClick(e)}
                >
                    <i className="pe-7s-user" />
                </button>
                <div className="account-dropdown">
                    <ul>
                        {currentCustomer ? (
                            <>
                                <li>
                                    <Link to="/shop/my-account">
                                        my account
                                    </Link>
                                </li>
                                <li>
                                    <span
                                        onClick={signOutCustomer}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {" "}
                                        LogOut{" "}
                                    </span>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/shop/login-register">Login</Link>
                                </li>
                                <li>
                                    <Link to="/shop/login-register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            <div className="same-style cart-wrap d-none d-lg-block">
                <button className="icon-cart" onClick={(e) => handleClick(e)}>
                    <i className="pe-7s-shopbag" />
                    <span className="count-style">
                        {cartItems && cartItems.length ? cartItems.length : 0}
                    </span>
                </button>
                {/* menu cart */}
                <MenuCart className="menu-cart"/>
            </div>

            {/* Shipping truck icon with Link and inline styling for hover effect */}
            <div
                className="same-style shipping-icon d-none d-lg-block"
                style={{
                    marginLeft: "10px",
                    paddingLeft: "10px",
                }}
            >
                <Link
                    to="/shop/tracking"
                    className="truck-icon-link"
                    style={{
                        textDecoration: "none",
                        color: "#000", // Set your default color
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.color = "#e89d4a")
                    }
                    onMouseOut={(e) => (e.currentTarget.style.color = "#000")}
                >
                    <i className="fa fa-truck fa-lg" />
                </Link>
            </div>

            <div className="same-style mobile-off-canvas d-block d-lg-none">
                <button
                    className="mobile-aside-button"
                    onClick={() => triggerMobileMenu()}
                >
                    <i className="pe-7s-menu" />
                </button>
            </div>
        </div>
    );
};

export default IconGroup;
