import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ProductImage from "/assets/Img/ProductTest.jpg";
import ProductModal from "./ProductModal";

const ProductGridSingle = ({ product }) => {
  const [modalShow, setModalShow] = useState(false);
  // const { addToast } = useToasts();

  return (
    <Fragment>
      <div className=" col-xl-3 col-md-6 col-lg-4 col-sm-6 ">
        <div className={`product-wrap mb-25`}>
          <div className="product-img">
            <img className="default-img" src={product.productImages[0] || Image} alt="" />
            {/* <img className="default-img" src={ProductImage} alt="" /> */}
            {product.productImages.length > 1 ? (
              <img className="hover-img" src={product.productImages[1]} alt="" />
              ) : (
                ""
                // <img className="hover-img" src={ProductImage} alt="" />
            )}

            <div className="product-action">
              <div className="pro-same-action pro-cart">
                <Link to={`/shop/product/${product._id}`}>
                  View Product details
                </Link>
              </div>
              <div className="pro-same-action pro-quickview">
                <button title="Quick View">
                  <i className="pe-7s-look" />
                </button>
                {/* <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button> */}
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>{product.productName}</h3>
            <div className="product-price">
              <span>{"$" + product.price} </span>
            </div>
          </div>
        </div>
      </div>

      {/* product modal */}
      {/* <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        cartitem={cartItem}
        product={product}
      /> */}
    </Fragment>
  );
};

export default ProductGridSingle;
