import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../../store/cart/cart.selector";
import { createNewOrder } from "../../../api/orderApi";

const Checkout = () => {
  const { pathname } = location;
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const HandleNewOrder = async () => {
    const sendedOrder = cartItems.map((cartItem) => ({
      productId: cartItem._id,
      quantity: cartItem.quantityCount,
      itemOptions: [],
    }));
    try {
      // console.log("this is sended order",sendedOrder);
      const newOrder = await createNewOrder(sendedOrder);
      // console.log("this is new order",newOrder);
    } catch (error) {
      // console.log(error.message);
    }
  };

  return (
    <Fragment>
      <BreadcrumbsItem to="/shop/home">Home</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>Checkout</BreadcrumbsItem>
      {/* breadcrumb */}
      <Breadcrumb />
      <div className="checkout-area pt-95 pb-100">
        <div className="container">
          {cartItems && cartItems.length >= 1 ? (
            <div className="row">
              <div className="col-lg-7">
                <div className="billing-info-wrap">
                  <h3>Billing Details</h3>
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>First Name</label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>Last Name</label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="billing-info mb-20">
                        <label>Company Name</label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="billing-select mb-20">
                        <label>Country</label>
                        <select>
                          <option>Select a country</option>
                          <option>Azerbaijan</option>
                          <option>Bahamas</option>
                          <option>Bahrain</option>
                          <option>Bangladesh</option>
                          <option>Barbados</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="billing-info mb-20">
                        <label>Street Address</label>
                        <input
                          className="billing-address"
                          placeholder="House number and street name"
                          type="text"
                        />
                        <input
                          placeholder="Apartment, suite, unit etc."
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="billing-info mb-20">
                        <label>Town / City</label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>State / County</label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>Postcode / ZIP</label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>Phone</label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>Email Address</label>
                        <input type="text" />
                      </div>
                    </div>
                  </div>

                  <div className="additional-info-wrap">
                    <h4>Additional information</h4>
                    <div className="additional-info">
                      <label>Order notes</label>
                      <textarea
                        placeholder="Notes about your order, e.g. special notes for delivery. "
                        name="message"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="your-order-area">
                  <h3>Your order</h3>
                  <div className="your-order-wrap gray-bg-4">
                    <div className="your-order-product-info">
                      <div className="your-order-top">
                        <ul>
                          <li>Product</li>
                          <li>Total</li>
                        </ul>
                      </div>
                      <div className="your-order-middle">
                        <ul>
                          {cartItems.map((cartItem, key) => {
                            return (
                              <li key={key}>
                                <span className="order-middle-left">
                                  {cartItem.productName} X{" "}
                                  {cartItem.quantityCount}
                                </span>{" "}
                                <span className="order-price">
                                  {"$" +
                                    (
                                      cartItem.price * cartItem.quantityCount
                                    ).toFixed(2)}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="your-order-bottom">
                        <ul>
                          <li className="your-order-shipping">Shipping</li>
                          <li>Free shipping</li>
                        </ul>
                      </div>
                      <div className="your-order-total">
                        <ul>
                          <li className="order-total">Total</li>
                          <li>{"$" + cartTotal.toFixed(2)}</li>
                        </ul>
                      </div>
                    </div>
                    <div className="payment-method"></div>
                  </div>
                  <div className="place-order mt-25">
                    <button onClick={HandleNewOrder} className="btn-hover">
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon mb-30">
                    <i className="pe-7s-cash"></i>
                  </div>
                  <div className="item-empty-area__text">
                    No items found in cart to checkout <br />{" "}
                    <Link to="/shop/home">Shop Now</Link>
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

export default Checkout;
