import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../../store/cart/cart.selector";
import { createNewOrder } from "../../../api/orderApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { deleteAllFromCart } from "../../../store/cart/cart.action";

const Checkout = () => {
  const { pathname } = location;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prevBillingInfo) => ({
      ...prevBillingInfo,
      [name]: value,
    }));
    console.log(billingInfo)
  };

  const HandleNewOrder = async () => {
    const sendedOrder = cartItems.map((cartItem) => ({
      productId: cartItem._id,
      quantity: cartItem.quantityCount,
      itemOptions: [],
      billingInfo: { ...billingInfo },
    }));
    try {
      console.log("this is sended order", sendedOrder);
      const newOrder = await createNewOrder(sendedOrder);
      console.log("this is new order", newOrder.data);
      if (newOrder.data.status === 201) {
        // Success message
        Swal.fire({
          icon: "success",
          title: "Order created successfully",
          text: newOrder.data.message,
        });
        navigate("/shop");
        dispatch(deleteAllFromCart(cartItems));
      } else {
        // Error message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: newOrder.data.message,
        });
      }
    } catch (error) {
      console.log(error.message);
      // Error message for any unexpected errors
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
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
                        <input
                          type="text"
                          name="firstName"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12"></div>
                    <div className="col-lg-12">
                      <div className="billing-info mb-20">
                        <label>Street Address</label>
                        <input
                          type="text"
                          name="streetAddress"
                          className="billing-address"
                          onChange={handleInputChange}
                          placeholder="House number and street name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="billing-info mb-20">
                        <label>Town / City</label>
                        <input
                          type="text"
                          onChange={handleInputChange}
                          name="city"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>State / County</label>
                        <input
                          type="text"
                          name="state"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>Postcode / ZIP</label>
                        <input
                          onChange={handleInputChange}
                          name="postcode"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>Phone</label>
                        <input
                          onChange={handleInputChange}
                          name="phone"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>Email Address</label>
                        <input
                          onChange={handleInputChange}
                          name="email"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="additional-info-wrap">
                    <h4>Additional information</h4>
                    <div className="additional-info">
                      <label>Order notes</label>
                      <textarea
                        placeholder="Notes about your order, e.g. special notes for delivery. "
                        name="orderNotes"
                        onChange={handleInputChange}
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
