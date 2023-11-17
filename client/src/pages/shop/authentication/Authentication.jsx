import React from "react";
import SignInForm from "../../../components/shop/customerAuth/SignInForm/SignInForm";
import SignUpForm from "../../../components/shop/customerAuth/SignUpForm/SignUpForm";
import './Authentication.css'
const Authentication = () => {
  return (
    <div className="authentication-container">
      {/* <SignInForm /> */}
      <SignUpForm />
    </div>
  );
};

export default Authentication;
