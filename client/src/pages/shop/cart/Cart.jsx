import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../../store/cart/cart.selector";
import {
  decreaseQuantity,
  deleteAllFromCart,
  deleteFromCart,
  increaseQuantity,
} from "../../../store/cart/cart.action";
import { selectCurrentCustomer } from "../../../store/customer/customer.selector";
import { FormattedNumber } from "../../../components/dashboard/FormattedNumber/FormattedNumber";

const Cart = () => {
  const { pathname } = location;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const currentCustomer = useSelector(selectCurrentCustomer);

  return (
    <Fragment>
      <BreadcrumbsItem to={"/shop"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>Cart</BreadcrumbsItem>
      {/* breadcrumb */}
      <Breadcrumb />
      <div className="cart-main-area pt-90 pb-100">
        <div className="container">
          {cartItems && cartItems.length >= 1 ? (
            <Fragment>
              <h3 className="cart-page-title">Your cart items</h3>
              <div className="row">
                <div className="col-12">
                  <div className="table-content table-responsive cart-table-content">
                    <table>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Unit Price</th>
                          <th>Qty</th>
                          <th>Subtotal</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((cartItem, key) => {
                          return (
                            <tr key={key}>
                              <td className="product-thumbnail">
                                <Link to={`/shop/product/${cartItem._id}`}>
                                  <img
                                    className="img-fluid"
                                    src={cartItem.productImages[0]}
                                    alt=""
                                    style={{ width: "100px", height: "120px" }}
                                  />
                                </Link>
                              </td>

                              <td className="product-name">
                                <Link to={`/shop/product/${cartItem._id}`}>
                                  {cartItem.productName}
                                </Link>
                              </td>

                              <td className="product-price-cart">
                                <Fragment>
                                  <span className="amount">
                                    <FormattedNumber value={cartItem.discountPrice} />
                                  </span>
                                </Fragment>
                              </td>

                              <td className="product-quantity">
                                <div className="cart-plus-minus">
                                  <button
                                    className="dec qtybutton"
                                    onClick={() =>
                                      dispatch(
                                        decreaseQuantity(cartItems, cartItem)
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <input
                                    className="cart-plus-minus-box"
                                    type="text"
                                    value={cartItem.quantityCount}
                                    readOnly
                                  />
                                  <button
                                    className="inc qtybutton"
                                    onClick={() =>
                                      dispatch(
                                        increaseQuantity(cartItems, cartItem)
                                      )
                                    }
                                    disabled={
                                      cartItem !== undefined &&
                                      cartItem.quantityCount &&
                                      cartItem.quantityCount >=
                                        cartItem.quantity
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="product-subtotal">
                                <FormattedNumber
                                  value={
                                    cartItem.quantityCount * cartItem.discountPrice
                                  }
                                />
                              </td>

                              <td className="product-remove">
                                <button
                                  onClick={() =>
                                    dispatch(
                                      deleteFromCart(cartItems, cartItem)
                                    )
                                  }
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="cart-shiping-update-wrapper">
                    <div className="cart-shiping-update">
                      <Link to="/shop/products">Continue Shopping</Link>
                    </div>
                    <div className="cart-clear">
                      <button
                        onClick={() => dispatch(deleteAllFromCart(cartItems))}
                      >
                        Clear Shopping Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                {/* Cart Total price here  */}
                <div className="col-lg-4 col-md-12">
                  <div className="grand-totall">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gary-cart">
                        Cart Total
                      </h4>
                    </div>
                    <h5>
                      Total products{" "}
                      <span>
                        {" "}
                        <FormattedNumber value={cartTotal.toFixed(2)} />
                      </span>
                    </h5>

                    <h4 className="grand-totall-title">
                      Grand Total{" "}
                      <span>
                        {" "}
                        <FormattedNumber value={cartTotal.toFixed(2)} />
                      </span>
                    </h4>
                    {currentCustomer ? (
                      <Link to={"/shop/checkout"}>Proceed to Checkout</Link>
                    ) : (
                      <Link to={"/shop/login-register"}>
                        Login First to Make Order
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon mb-30">
                    <i className="pe-7s-cart"></i>
                  </div>
                  <div className="item-empty-area__text">
                    No items found in cart <br />{" "}
                    <Link to="/shop/products">Shop Now</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
