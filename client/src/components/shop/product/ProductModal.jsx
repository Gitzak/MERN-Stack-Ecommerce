import React, { Fragment, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../../store/cart/cart.selector";
import { getProductCartQuantity } from "../../../helpers/product";
import { addToCart } from "../../../store/cart/cart.action";
import { FormattedNumber } from "../../dashboard/FormattedNumber/FormattedNumber";

function ProductModal({ product, show, onHide }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [productStock, setProductStock] = useState(product.quantity);
  const productCartQty = getProductCartQuantity(cartItems, product);
  const [quantityCount, setQuantityCount] = useState(1);

  const AddToCartHandler = () => {
    const cartProduct = {
      ...product,
      quantityCount: quantityCount,
    };
    dispatch(addToCart(cartItems, cartProduct));
  };
  return (
    <Fragment>
      <Modal
        show={show}
        onHide={onHide}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                {/* <Swiper {...gallerySwiperParams}>
                  {product.productImages &&
                    product.productImages[0].map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              src={single}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper> */}
                {product.productImages &&
                  product.productImages.slice(0, 1).map((single, key) => {
                    return (
                      <div
                        className="product-sticky-image__single mb-10"
                        key={key}
                      >
                        <img
                          src={single}
                          alt=""
                          className="img-fluid"
                          style={{ width: "1000px", height: "auto" }}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.productName}</h2>
                <div className="product-details-price">
                  <span>
                    <FormattedNumber value={product.discountPrice} />
                  </span>{" "}
                  <span className="old">
                    <FormattedNumber value={product.price} />
                  </span>
                </div>
                <div className="pro-details-list">
                  <p>{product.shortDescription}</p>
                </div>

                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <button
                      onClick={() =>
                        setQuantityCount(
                          quantityCount > 1 ? quantityCount - 1 : 1
                        )
                      }
                      className="dec qtybutton"
                    >
                      -
                    </button>
                    <input
                      className="cart-plus-minus-box"
                      type="text"
                      value={quantityCount}
                      readOnly
                    />
                    <button
                      onClick={() =>
                        // setQuantityCount(
                        //   quantityCount < productStock - productCartQty
                        //     ? quantityCount + 1
                        //     : quantityCount
                        // )
                        setQuantityCount(
                          quantityCount < productStock
                            ? quantityCount + 1
                            : quantityCount
                        )
                      }
                      className="inc qtybutton"
                    >
                      +
                    </button>
                  </div>

                  <div className="pro-details-cart btn-hover">
                    {productStock && productStock > 0 ? (
                      <button
                        onClick={AddToCartHandler}
                        disabled={productCartQty >= productStock}
                      >
                        Add To Cart{" "}
                      </button>
                    ) : (
                      <button disabled>Out of Stock</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default ProductModal;
