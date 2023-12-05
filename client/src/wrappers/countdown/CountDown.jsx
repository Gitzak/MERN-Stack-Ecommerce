import React from "react";
import { Link } from "react-router-dom";
import DealProduct from "/assets/Img/HeroImage.jpg";
import Countdown from "react-countdown";
import Renderer from "../../components/shop/countdown/Renderer";

const CountDown = () => {
  const dateTime = new Date("December 6, 2023 12:12:00");

  return (
    <div className="funfact-area pt-100 pb-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8 col-lg-6 order-1 order-lg-2">
            <div className="funfact-content funfact-res text-center">
              <h2>Deal of the day</h2>
              <div className="timer">
                <Countdown
                  date={dateTime}
                  renderer={(props) => <Renderer {...props} />}
                />
              </div>
              <div className="funfact-btn funfact-btn--round-shape funfact-btn-red btn-hover">
                <Link to={"/shop-grid-standard"}>SHOP NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-6 order-2 order-lg-1">
            <div className="funfact-image">
              <Link to={"/shop-grid-standard"}>
                <img src={DealProduct} alt="" className="img-fluid" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
