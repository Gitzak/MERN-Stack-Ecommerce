import React from "react";
import ProductGrid from "./ProductGrid";

const ShopProductsGrid = ({products}) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className="row grid three-column ">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ShopProductsGrid;
