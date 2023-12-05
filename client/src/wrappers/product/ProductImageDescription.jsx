import React from "react";
import ProductImageGallerySideThumb from "../../components/shop/product/ProductImageGallerySideThumb";
import ProductDescriptionInfo from "../../components/shop/product/ProductDescriptionInfo";
import { useSelector } from "react-redux";
import { selectProductDetail } from "../../store/products/product.selector";

const ProductImageDescription = () => {
  const productDetail = useSelector(selectProductDetail);
  console.log("pro from deatail page", productDetail);

  if (!productDetail) {
    return (
      <div className="flone-preloader-wrapper">
        <div className="flone-preloader">
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className=" shop-area pt-100 pb-100 ">
      <div className="container">
        <div className="row">
          {/* product image gallery */}
          <div className="col-lg-6 col-md-6">
            <ProductImageGallerySideThumb product={productDetail} />
          </div>
          {/* product description info */}
          <div className="col-lg-6 col-md-6">
            <ProductDescriptionInfo product={productDetail} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageDescription;
