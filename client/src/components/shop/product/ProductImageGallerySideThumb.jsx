import React from "react";

const ProductImageGalleryLeftThumb = ({ product }) => {
  return (
    <div className="product-large-image-wrapper product-large-image-wrapper--sticky">
      <div className="product-sticky-image mb--10">
        {product.productImages &&
          product.productImages.map((single, key) => {
            return (
              <div className="product-sticky-image__single mb-10" key={key}>
                <img
                  src={single}
                  alt=""
                  className="img-fluid"
                  style={{ width: "600px", height: "auto" }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductImageGalleryLeftThumb;
