import React from "react";
import { Link } from "react-router-dom";

const BannerSingle = ({ data }) => {
    return (
        <div className="col-lg-6 col-md-6">
            <div
                className={`single-banner-2 mb-30
        } ${data.textAlign === "right" ? "align_right" : ""}`}>
                <Link to={data.link}>
                    <img src={data.image} alt="" />
                </Link>
                <div className="banner-content-2 banner-content-2--style2">
                    <h3 className="text-white">{data.title}</h3>
                    <h4 className="text-white">
                        {data.subtitle} <span>{data.price}</span>
                    </h4>
                    <Link to={data.link}>SHOP NOW</Link>
                </div>
            </div>
        </div>
    );
};

export default BannerSingle;
