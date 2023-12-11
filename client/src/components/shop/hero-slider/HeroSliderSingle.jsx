import React from "react";
import { Link } from "react-router-dom";

const HeroSliderSingle = ({ data }) => {
  return (
    <div
      className="single-slider-2 slider-height-2 d-flex align-items-center bg-img swiper-slide overlay-dark"
      style={{ backgroundImage: `url(${data.image})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-10 col-lg-10 col-md-10 col-12">
            <div className="slider-content-2 slider-animated-1">
              <h1 className="animated no-style text-white">{data.title}</h1>
              <h2
                className="animated text-white"
                dangerouslySetInnerHTML={{ __html: data.subtitle }}
              />
              <div className="slider-btn slider-btn--style2 btn-hover">
                <Link className="animated rounden-btn" to="/shop/products">
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSliderSingle;
