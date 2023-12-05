import React, { Fragment, useEffect } from "react";
import ProductGridSingle from "../../components/shop/product/ProductGridSingle";
import { setCurrentProducts } from "../../store/products/product.action";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../api/productApi";
import { selectCurrentProducts } from "../../store/products/product.selector";

const ProductGrid = ({ Number }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        GetAllProducts().then((res) => {
          dispatch(setCurrentProducts(res.data.products));
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const currentProducts = useSelector(selectCurrentProducts);

  return (
    <Fragment>
      {currentProducts &&
        currentProducts.slice(0, Number).map((product, index) => {
          return <ProductGridSingle product={product} key={index} />;
        })}
    </Fragment>
  );
};

export default ProductGrid;
