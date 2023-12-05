import React from "react";

const FeatureIconSingle = ({ data }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-6">
      <div
        className="support-wrap-3 text-center mb-10"
        style={{ backgroundColor: `${data.backgroundColor}` }}
      >
        <div className="support-icon-2">
          <img className="animated" src={data.iconImage} alt="" />
        </div>
        <div className="support-content-3">
          <img src={data.titleImage} alt="" />
          <p>{data.title}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureIconSingle;
