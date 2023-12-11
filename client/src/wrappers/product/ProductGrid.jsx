import React, { Fragment } from "react";
import ProductGridSingle from "../../components/shop/product/ProductGridSingle";


const ProductGrid = ({ eventKey, Number, products }) => {
  return (
    <Fragment>
      {Array.isArray(products) &&
        products.slice(0, Number).map((product, index) => (
          <ProductGridSingle product={product} key={index} />
        ))}
    </Fragment>
  );
};





export default ProductGrid;
