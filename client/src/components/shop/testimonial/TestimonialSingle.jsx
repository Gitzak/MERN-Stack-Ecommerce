import React from "react";

const TestimonialSingle = ({ data }) => {
  return (
    <div className="single-testimonial text-center swiper-slide">
      <img src={data.image} alt="" />
      <p>{data.content}</p>
      <div className="client-info">
        <i className="fa fa-map-signs" />
        <h5>{data.customerName}</h5>
        <span>{data.title}</span>
      </div>
    </div>
  );
};

export default TestimonialSingle;
