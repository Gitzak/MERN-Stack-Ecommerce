import React from "react";
import { Link } from "react-router-dom";
import LogoImage from '/assets/logo/logo.png'

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/shop">
        <img alt="" src={LogoImage} />
      </Link>
    </div>
  );
};

export default Logo;
