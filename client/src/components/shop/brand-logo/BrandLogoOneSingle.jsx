import PropTypes from "prop-types";
import React from "react";

const BrandLogoOneSingle = ({ data, sliderClassName, spaceBottomClass }) => {
  const imgStyle = {
    objectFit: "cover",
    width: "100%", // Ensures the image takes the full width of the container
    height: "100%", // Ensures the image takes the full height of the container
  };
  return (
    <div
      className={`single-brand-logo ${sliderClassName ? sliderClassName : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
      style={{ width: "150px", height: "100px" }} // Set your preferred size
    >
      <img src={data.image} alt="" style={imgStyle}/>
    </div>
  );
};

BrandLogoOneSingle.propTypes = {
  data: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default BrandLogoOneSingle;
