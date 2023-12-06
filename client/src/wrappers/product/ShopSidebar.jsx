import React from "react";
// import {
//   getIndividualCategories,
//   getIndividualTags,
//   getIndividualColors,
//   getProductsIndividualSizes,
// } from "../../helpers/product";

import ShopSearch from "../../components/shop/product/ShopSearch";
import ShopCategories from "../../components/shop/product/ShopCategories";

const ShopSidebar = () => {
  // const uniqueCategories = getIndividualCategories(products);
  // const uniqueColors = getIndividualColors(products);
  // const uniqueSizes = getProductsIndividualSizes(products);
  // const uniqueTags = getIndividualTags(products);

  return (
    <div className="sidebar-style mr-30 ">
      {/* shop search */}
      <ShopSearch />

      {/* filter by categories */}
      <ShopCategories />
    </div>
  );
};

export default ShopSidebar;
