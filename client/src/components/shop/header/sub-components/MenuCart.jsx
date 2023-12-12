import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../../../store/cart/cart.selector";
import { deleteFromCart } from "../../../../store/cart/cart.action";
import { selectCurrentCustomer } from "../../../../store/customer/customer.selector";
import { FormattedNumber } from "../../../dashboard/FormattedNumber/FormattedNumber";

const MenuCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const currentCustomer = useSelector(selectCurrentCustomer);

  return (
    <div className="shopping-cart-content" style={{ backgroundColor: "white" }}>
      {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <ul>
            {cartItems.map((single, key) => {
              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link to={`/shop/product/${single._id}`}>
                      <img
                        alt=""
                        src={single.productImages[0]}
                        className="img-fluid"
                        style={{height:"100px", width: "80px"}}
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={`/shop/product/${single._id}`}>
                        {" "}
                        {single.productName}{" "}
                      </Link>
                    </h4>
                    <h6>Qty: {single.quantityCount}</h6>
                    <span><FormattedNumber value={single.discountPrice} /></span>
                  </div>
                  <div className="shopping-cart-delete">
                    <button
                      onClick={() =>
                        dispatch(deleteFromCart(cartItems, single))
                      }
                    >
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total"> <FormattedNumber value={cartTotal.toFixed(2)}/></span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to="/shop/cart">
              view cart
            </Link>
            {currentCustomer && (
              <Link className="default-btn" to="/shop/checkout">
                checkout
              </Link>
            )}
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

export default MenuCart;
