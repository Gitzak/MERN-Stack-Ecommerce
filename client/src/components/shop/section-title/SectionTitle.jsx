import React from "react";

const SectionTitle = ({
  titleText,
  positionClass,
  spaceClass,
  borderClass,
}) => {
  return (
    <div
      className={`section-title ${positionClass ? positionClass : ""} ${
        spaceClass ? spaceClass : ""
      } ${borderClass ? borderClass : ""}`}
    >
      <h2>{titleText}</h2>
    </div>
  );
};

export default SectionTitle;
