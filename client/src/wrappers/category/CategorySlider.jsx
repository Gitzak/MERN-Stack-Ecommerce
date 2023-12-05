import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import categoryData from "../../data/category/category-data.json";
import CategorySingle from "../../components/shop/category/CategorySingle";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

const CategorySlider = () => {
  const swiperSettings = {
    modules: [Autoplay],
    slidesPerView: 4,
    autoplay: { delay: 5000, disableOnInteraction: false },
    loop: true,
    spaceBetween: 30,
  };

  return (
    <div className="collections-area pt-100 pb-95 ">
      <div className="container">
        <div className="collection-wrap">
          <div className="collection-active">
            <Swiper {...swiperSettings}>
              {categoryData &&
                categoryData.map((single) => (
                  <SwiperSlide key={single.id}>
                    <CategorySingle data={single} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
