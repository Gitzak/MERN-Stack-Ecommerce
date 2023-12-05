import React from "react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import testimonialData from "../../data/testimonial/testimonial-data.json";
import TestimonialSingle from "../../components/shop/testimonial/TestimonialSingle";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Testimonial = () => {
  // Swiper settings

  const swiperSettings = {
    modules: [Pagination, Autoplay],
    slidesPerView: 1,
    autoplay: { delay: 5000, disableOnInteraction: false },
    loop: true,
    // pagination: { clickable: true },
  };

  return (
    <div className="testimonial-area pt-100 pb-95 ml-70 mr-70 bg-gray-3">
      <div className="container">
        <div className="row" style={{justifyContent: "center"}}>
          <div className="col-lg-10 ml-auto mr-auto">
            <div className="testimonial-active nav-style-1 nav-testi-style">
              <Swiper {...swiperSettings}>
                {testimonialData &&
                  testimonialData.map((single) => (
                    <SwiperSlide key={single.id}>
                      <TestimonialSingle data={single} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
