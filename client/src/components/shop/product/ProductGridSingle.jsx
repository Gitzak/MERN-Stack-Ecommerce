import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ProductModal from "./ProductModal";
import { FormattedNumber } from "../../dashboard/FormattedNumber/FormattedNumber";

const ProductGridSingle = ({ product }) => {
  const [modalShow, setModalShow] = useState(false);
  console.log(product);

  return (
    <Fragment>
      <div className=" col-xl-3 col-md-6 col-lg-3 col-sm-6 ">
        <div className={`product-wrap mb-25`}>
          <div className="product-img">
            <Link to={`/shop/product/${product._id}`}>
              <img
                className="default-img"
                src={product.productImages[0] || Image}
                alt=""
                style={{ height: "auto" }}
              />
            </Link>
            {product.productImages.length > 1 ? (
              <Link to={`/shop/product/${product._id}`}>
                <img
                  className="hover-img"
                  src={product.productImages[1]}
                  alt=""
                  style={{ height: "auto" }}
                />
              </Link>
            ) : (
              ""
            )}

            <div className="product-action">
              <div className="pro-same-action pro-cart">
                <Link to={`/shop/product/${product._id}`}>
                  View Product details
                </Link>
              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>{product.productName}</h3>
            <div className="product-price">
              <span>
                <FormattedNumber value={product.discountPrice} />{" "}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
      />
    </Fragment>
  );
};

export default ProductGridSingle;
