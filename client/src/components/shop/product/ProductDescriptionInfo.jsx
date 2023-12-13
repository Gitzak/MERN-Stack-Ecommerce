import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getProductCartQuantity } from "../../../helpers/product";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../../store/cart/cart.selector";
import { addToCart } from "../../../store/cart/cart.action";
import { FormattedNumber } from "../../dashboard/FormattedNumber/FormattedNumber";

const ProductDescriptionInfo = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [productStock, setProductStock] = useState(product.quantity);
  const productCartQty = getProductCartQuantity(cartItems, product);
  const [quantityCount, setQuantityCount] = useState(1);


  const AddToCartHandler = () => {
    const cartProduct = {
      ...product,
      quantityCount: quantityCount,
    }
    dispatch(addToCart(cartItems, cartProduct));
  }

  return (
    <div className="product-details-content ml-70">
      <h2>{product.productName}</h2>
      <div className="product-details-price">
        <span ><FormattedNumber value={product.discountPrice} /></span>{" "}
        <span className="old"><FormattedNumber value={product.price} /></span>
      </div>
      <div className="pro-details-list">
        <p>{product.shortDescription}</p>
      </div>

      <div className="pro-details-quality">
        <div className="cart-plus-minus">
          <button
            onClick={() =>
              setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
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
                quantityCount < productStock ? quantityCount + 1 : quantityCount
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

      {product.categories ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.categories &&
              product.categories.map((single, key) => {
                return (
                  <li key={key}>
                    <Link to={"/shop-grid-standard"}>
                      {single.category_name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      ) : (
        ""
      )}
      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDescriptionInfo;
