import React from "react";
import { Link } from "react-router-dom";
import LogoImage from '/assets/logo/Handmade.webp'

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/shop">
        <img alt="" src={LogoImage} width={120} />
      </Link>
    </div>
  );
};

export default Logo;
