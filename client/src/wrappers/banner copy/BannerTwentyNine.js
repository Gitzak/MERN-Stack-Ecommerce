import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const BannerTwentyNine = ({ spaceBottomClass }) => {
  return (
    <div className={`banner-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 pb-30">
            <div className="single-banner-3">
              <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/img/banner/banner-39.jpg"
                  }
                  alt=""
                  className="img-fluid"
                />
              </Link>
              <div className="banner-content-3 banner-content-3--right">
                <h4>
                  Up To 40% Off <br /> All New Products
                </h4>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 pb-30">
            <div className="single-banner-3">
              <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/img/banner/banner-40.jpg"
                  }
                  alt=""
                  className="img-fluid"
                />
              </Link>
              <div className="banner-content-3">
                <h4>
                  Free Shipping & <br /> The Best Items Granted
                </h4>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BannerTwentyNine.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default BannerTwentyNine;
