import React, { Fragment } from "react";
import HeroSlider from "../../../wrappers/hero-slider/HeroSlider";
import CategorySlider from "../../../wrappers/category/CategorySlider";
import Banner from "../../../wrappers/banner/Banner";
import FeatureIcon from "../../../wrappers/feature-icon/FeatureIcon";
import CountDown from "../../../wrappers/countdown/CountDown";
import Testimonial from "../../../wrappers/testimonial/Testimonial";
import Newsletter from "../../../wrappers/newsletter/Newsletter";
import TabProduct from "../../../wrappers/product/TabProduct";

const Home = () => {
  return (
    <Fragment>
        {/* hero slider */}
        <HeroSlider />
        {/* category */}
        <CategorySlider />
        {/* banner */}
        <Banner />
        {/* tab product */}
        <TabProduct/>
        {/* feature icon */}
        <FeatureIcon />
        {/* countdown */}
        <CountDown />
        {/* testimonial */}
        <Testimonial />
        {/* newsletter */}
        <Newsletter />
    </Fragment>
  );
};

export default Home;
