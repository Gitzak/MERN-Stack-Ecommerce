import React, { Fragment, useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb";
import ShopTopbar from "../../../wrappers/product/ShopTopbar";
import ShopSidebar from "../../../wrappers/product/ShopSidebar";
import ShopProductsGrid from "../../../wrappers/product/ShopProductsGrid";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../../api/productApi";
import { setCurrentProducts } from "../../../store/products/product.action";
import { selectCurrentProducts } from "../../../store/products/product.selector";

const ShopProducts = () => {
  const { pathname } = location;
  const [currentData, setCurrentData] = useState([]);
  const [gotedProducts, setGotedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const pageLimit = 8;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        GetAllProducts().then((res) => {
          dispatch(setCurrentProducts(res.data.products));
        });
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  const { currentProducts } = useSelector(selectCurrentProducts);
  const currentProductsNow = currentProducts.currentProducts;

  useEffect(() => {
    setGotedProducts(currentProductsNow);
    setCurrentData(gotedProducts.slice(offset, offset + pageLimit));
  }, [offset, gotedProducts]);

  return (
    <Fragment>
      <BreadcrumbsItem to="/shop">Home</BreadcrumbsItem>
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
              <ShopProductsGrid products={currentData} />

              {/* shop product pagination */}
              <div className="pro-pagination-style text-center mt-30">
                <Paginator
                  totalRecords={gotedProducts.length}
                  pageLimit={pageLimit}
                  pageNeighbours={2}
                  setOffset={setOffset}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageContainerClass="mb-0 mt-0"
                  pagePrevText="«"
                  pageNextText="»"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShopProducts;
