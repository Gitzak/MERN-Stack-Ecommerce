import React from "react";
import { Carousel } from "antd";
// import {ims} from "../../../../public/images"
// import image1 from '../../../assets/images/handmadeBanner1.png'
// const {im1,
//   im2, im3, im4, im5} = [
//     ims.handmadeBanner1,
//     ims.handmadeBanner2,
//     ims.handmadeBanner3,
//     ims.handmadeBanner4,
//     ims.handmadeBanner5,
// ]
import im1 from "../../../assets/images/1.png";
import im2 from "../../../assets/images/2.png";
import im3 from "../../../assets/images/3.png";
import im4 from "../../../assets/images/4.png";
import im5 from "../../../assets/images/5.png";

// import im1 from "../../../assets/images/1.jpg";
// import im2 from "../../../assets/images/2.jpg";
// import im3 from "../../../assets/images/3.jpg";
// import im4 from "../../../assets/images/4.jpg";
// import im5 from "../../../assets/images/5.jpg";

// import im1 from "/images/handmadeBanner1.jpg"
// import im2 from "/images/handmadeBanner2.jpg"
// import im3 from "/images/handmadeBanner3.jpg"
// import im4 from "/images/handmadeBanner4.jpg"
// import im5 from "/images/handmadeBanner5.jpg"

const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};
const imageStyle = {
    // height: "auto",
    width: "100%",
};

const images = [
    im1,
    im2,
    im3,
    im4,
    im5,
];
const HomeTrying = () => {
    return (
        <>
            <Carousel autoplay>
                {images.map((image, index) => (
                    <div key={index}>
                        {/* <h3 style={contentStyle}>
                          {index + 1}
                        </h3> */}
                        <img
                            src={image}
                            alt={`Banner ${index + 1}`}
                            style={imageStyle}
                        />
                    </div>
                ))}
            </Carousel>
        </>
    );
};

export default HomeTrying;
