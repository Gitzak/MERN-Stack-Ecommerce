import React from "react";
import bannerData from "../../data/banner/banner-data.json";
import BannerSingle from "../../components/shop/banner/BannerSingle";

const Banner = () => {
  return (
    <div className=" banner-area ">
      <div className="row no-gutters">
        {bannerData &&
          bannerData.map((single, key) => {
            return <BannerSingle data={single} key={key} />;
          })}
      </div>
    </div>
  );
};

export default Banner;
