import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

import sliderData from "../../data/hero-sliders/hero-slider-data.json";
import HeroSliderSingle from "../../components/shop/hero-slider/HeroSliderSingle";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import 'swiper/css/effect-fade'; 


const HeroSlider = () => {
  const swiperSettings = {
    modules: [Pagination, Autoplay, EffectFade],
    slidesPerView: 1,
    autoplay: { delay: 5000, disableOnInteraction: false },
    loop: true,
    pagination: { clickable: true },
    // effect:"fade",
    // speed: 1000, 

  };
  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        <Swiper {...swiperSettings}>
          {sliderData &&
            sliderData.map((single) => (
              <SwiperSlide key={single.id}>
                <HeroSliderSingle data={single} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSlider;
