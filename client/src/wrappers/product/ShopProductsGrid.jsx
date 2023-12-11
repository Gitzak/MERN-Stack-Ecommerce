import React from "react";
import ProductGrid from "./ProductGrid";

const ShopProductsGrid = () => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className="row grid three-column ">
        <ProductGrid />
      </div>
    </div>
  );
};

export default ShopProductsGrid;
