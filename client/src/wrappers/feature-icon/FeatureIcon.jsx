import React from "react";
import featureIconData from "../../data/feature-icons/feature-icon-data.json";
import FeatureIconSingle from "../../components/shop/feature-icon/FeatureIconSingle";
import ShapeImage from "/assets/Img/shape.png";

const FeatureIcon = () => {
  return (
    <div
      className="support-area hm9-section-padding pt-50 pb-40"
      style={{
        backgroundImage: `url(${ShapeImage})`,
      }}
    >
      <div className="container-fluid padding-10-row-col">
        <div className="row">
          {featureIconData &&
            featureIconData.map((single, key) => {
              return <FeatureIconSingle data={single} key={key} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default FeatureIcon;
