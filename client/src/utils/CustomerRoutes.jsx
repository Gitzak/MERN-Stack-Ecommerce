// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentCustomer } from "../store/customer/customer.selector";

const PrivateCustomerRoute = ({ element: Element, ...rest }) => {
  const currentCustomer = useSelector(selectCurrentCustomer);
  return (
    <Route
      {...rest}
      element={
        currentCustomer ? (
          <Element />
        ) : (
          <Navigate to="/shop/login-register" replace />
        )
      }
    />
  );
};

export default PrivateCustomerRoute;

export const AuthCustomerRoute = ({
  element: Element,
  redirectTo,
  ...rest
}) => {
  const currentCustomer = useSelector(selectCurrentCustomer);

  return (
    <Route
      {...rest}
      element={
        currentCustomer ? (
          <Navigate to="/shop/my-account" replace />
        ) : (
          <Element />
        )
      }
    />
  );
};
