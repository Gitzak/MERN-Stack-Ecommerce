import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb";
import ProductImageDescription from "../../../wrappers/product/ProductImageDescription";
import { useDispatch } from "react-redux";
import { GetOneProduct } from "../../../api/productApi";
import { setProductDetail } from "../../../store/products/product.action";

const ProductDetails = () => {
  const { pathname } = location;
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await GetOneProduct(id);
        const productDetailData = response.data.data;
        dispatch(setProductDetail(productDetailData));
      } catch (error) {
        // console.log(error.message);
      }
    };
    fetchProductDetail();
  }, [id]);

  return (
    <Fragment>
      <BreadcrumbsItem to={"/shop"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>Shop Product</BreadcrumbsItem>

      {/* breadcrumb */}
      <Breadcrumb />
      {/* product description with image */}
      <ProductImageDescription />
    </Fragment>
  );
};

export default ProductDetails;
