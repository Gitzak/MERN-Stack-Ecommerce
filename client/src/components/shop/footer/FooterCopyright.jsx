import React from "react";
import { Link } from "react-router-dom";
import LogoImage from "/assets/logo/logo.png";

const FooterCopyright = () => {
  return (
    <div className="copyright mb-30">
      <div className="footer-logo">
        <Link to="/shop">
          <img alt="" src={LogoImage} />
        </Link>
      </div>
      <p>
        © 2020{" "}
        <a href="//hasthemes.com" rel="noopener noreferrer" target="_blank">
          Artizana Moroco
        </a>
        .<br /> All Rights Reserved
      </p>
    </div>
  );
};

export default FooterCopyright;
