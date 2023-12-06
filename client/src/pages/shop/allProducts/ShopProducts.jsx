import React, { Fragment, useState, useEffect } from "react";
// import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb";

// import { getSortedProducts } from "../../helpers/product";

// import ShopSidebar from "../../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../../wrappers/product/ShopTopbar";
import ShopSidebar from "../../../wrappers/product/ShopSidebar";
import ShopProductsGrid from "../../../wrappers/product/ShopProductsGrid";

const ShopProducts = () => {
  // const [layout, setLayout] = useState("grid three-column");
  // const [sortType, setSortType] = useState("");
  // const [sortValue, setSortValue] = useState("");
  // const [filterSortType, setFilterSortType] = useState("");
  // const [filterSortValue, setFilterSortValue] = useState("");
  // const [offset, setOffset] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [currentData, setCurrentData] = useState([]);
  // const [sortedProducts, setSortedProducts] = useState([]);

  // const pageLimit = 15;
  const { pathname } = location;

  // const getLayout = (layout) => {
  //   setLayout(layout);
  // };

  // const getSortParams = (sortType, sortValue) => {
  //   setSortType(sortType);
  //   setSortValue(sortValue);
  // };

  // const getFilterSortParams = (sortType, sortValue) => {
  //   setFilterSortType(sortType);
  //   setFilterSortValue(sortValue);
  // };

  // useEffect(() => {
  //   let sortedProducts = getSortedProducts(products, sortType, sortValue);
  //   const filterSortedProducts = getSortedProducts(
  //     sortedProducts,
  //     filterSortType,
  //     filterSortValue
  //   );
  //   sortedProducts = filterSortedProducts;
  //   setSortedProducts(sortedProducts);
  //   setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  // }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  return (
    <Fragment>
      <BreadcrumbsItem to="/shop/home">Home</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>Shop</BreadcrumbsItem>

      {/* breadcrumb */}
      <Breadcrumb />

      <div className="shop-area pt-95 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 order-2 order-lg-1">
              {/* shop sidebar */}
              <ShopSidebar />
            </div>

            <div className="col-lg-9 order-1 order-lg-2">
              {/* shop topbar default */}
              <ShopTopbar />

              {/* shop page content default */}
              <ShopProductsGrid />

              {/* shop product pagination */}
              <div className="pro-pagination-style text-center mt-30">
                {/* <Paginator
                  // totalRecords={sortedProducts.length}
                  // pageLimit={pageLimit}
                  // pageNeighbours={2}
                  // setOffset={setOffset}
                  // currentPage={currentPage}
                  // setCurrentPage={setCurrentPage}
                  // pageContainerClass="mb-0 mt-0"
                  // pagePrevText="«"
                  // pageNextText="»"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShopProducts;
