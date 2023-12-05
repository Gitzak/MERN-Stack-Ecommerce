import React from "react";
import SubscribeEmail from "./sub-components/SubscribeEmail";

const FooterNewsletter = () => {
  return (
    <div className=" footer-widget mb-30 ml-ntv5 ">
      <div className="footer-title">
        <h3>SUBSCRIBE</h3>
      </div>
      <div className="subscribe-style">
        <p>Get E-mail updates about our latest shop and special offers.</p>
        {/* subscribe email */}
        <SubscribeEmail />
      </div>
    </div>
  );
};

export default FooterNewsletter;
