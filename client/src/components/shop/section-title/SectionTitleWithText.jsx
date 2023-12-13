import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
    return (
        <div
            className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
                spaceBottomClass ? spaceBottomClass : ""
            }`}
        >
            <div className="container">
                <div className="welcome-content text-center">
                    <h5>Who Are We</h5>
                    <h1>Welcome To Moroccan Handmade</h1>
                    <p>
                        Welcome to Moroccan Handmade, where passion meets
                        craftsmanship. We are a dedicated team of artisans and
                        enthusiasts committed to curating and bringing you the
                        finest handmade products. Our journey is rooted in a
                        love for authenticity and a desire to showcase the
                        artistry behind every creation. Join us in celebrating
                        the beauty of handmade goods crafted with care and
                        precision.
                    </p>
                </div>
            </div>
        </div>
    );
};

SectionTitleWithText.propTypes = {
    spaceBottomClass: PropTypes.string,
    spaceTopClass: PropTypes.string,
};

export default SectionTitleWithText;
