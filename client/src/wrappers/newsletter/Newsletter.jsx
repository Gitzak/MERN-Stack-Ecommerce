import React from "react";
import SubscribeEmail from "../../components/shop/newsletter/SubscribeEmail";

const Newsletter = () => {
  return (
    <div className="subscribe-area-3 pt-100 pb-100 ">
      <div className="container-fluid">
        <div className="row" style={{justifyContent:'center'}}>
          <div className="col-xl-5 col-lg-7 col-md-10 ml-auto mr-auto">
            <div className="subscribe-style-3 text-center dark-red-subscribe">
              <h2>Join With Us! </h2>
              <p>Subscribe to our newsletter to receive news on update</p>
              {/* subscription form */}
              <SubscribeEmail mailchimpUrl="https://gmail.us12.list-manage.com/subscribe/post?u=c0269880bdcd512203308b210&amp;id=4803988f89&amp;f_id=00696de0f0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
