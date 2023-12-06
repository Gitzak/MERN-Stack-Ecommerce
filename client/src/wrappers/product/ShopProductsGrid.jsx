import React from "react";
import ProductGrid from "./ProductGrid";

const ShopProductsGrid = ({ products, layout }) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className="row grid three-column ">
        {/* <ProductgridList products={products} spaceBottomClass="mb-25" /> */}
        <ProductGrid />

      </div>
    </div>
  );
};

export default ShopProductsGrid;
