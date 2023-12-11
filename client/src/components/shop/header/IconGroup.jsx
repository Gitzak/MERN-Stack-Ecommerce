import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { selectCartItems } from "../../../store/cart/cart.selector";
import { logoutCustomer, setCurrentCustomer } from "../../../store/customer/customer.action";
import { selectCurrentCustomer } from "../../../store/customer/customer.selector";

const IconGroup = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const currentCustomer = useSelector(selectCurrentCustomer);
    const navigate = useNavigate();

    const signOutCustomer = () => {
        dispatch(logoutCustomer());
        navigate("/shop/login-register");
    };

    const handleClick = (e) => {
        e.currentTarget.nextSibling.classList.toggle("active");
    };

    const triggerMobileMenu = () => {
        const offcanvasMobileMenu = document.querySelector("#offcanvas-mobile-menu");
        offcanvasMobileMenu.classList.add("active");
    };

    return (
        <div className=" header-right-wrap">
            <div className="same-style account-setting d-none d-lg-block">
                <button className="account-setting-active" onClick={(e) => handleClick(e)}>
                    <i className="pe-7s-user" />
                </button>
                <div className="account-dropdown">
                    <ul>
                        {currentCustomer ? (
                            <>
                                <li>
                                    <Link to="/shop/my-account">my account</Link>
                                </li>
                                <li>
                                    <span onClick={signOutCustomer} style={{ cursor: "pointer" }}>
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
                                    <Link to="/shop/login-register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            <div className="same-style cart-wrap d-none d-lg-block">
                <button className="icon-cart" onClick={(e) => handleClick(e)}>
                    <i className="pe-7s-shopbag" />
                    <span className="count-style">{cartItems && cartItems.length ? cartItems.length : 0}</span>
                </button>
                {/* menu cart */}
                <MenuCart />
            </div>

            <div className="same-style mobile-off-canvas d-block d-lg-none">
                <button className="mobile-aside-button" onClick={() => triggerMobileMenu()}>
                    <i className="pe-7s-menu" />
                </button>
            </div>
        </div>
    );
};

export default IconGroup;
