import React from "react";
import { Link } from "react-router-dom";

const CategorySingle = ({ data, sliderClass }) => {
  return (
    <div className=" collection-product swiper-slide ">
      <div className="collection-img" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Link to={data.link}>
          <img src={data.image} alt="" style={{borderRadius:"3px", height: "200px"}} />
        </Link>
      </div>
      <div className="collection-content text-center">
        <span>{data.subtitle}</span>
        <h4>
          <Link to={data.link}>{data.title}</Link>
        </h4>
        <Link to={data.link} className="collection-btn">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
};

export default CategorySingle;
