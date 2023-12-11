import React, { Fragment, useEffect } from "react";
import ProductGridSingle from "../../components/shop/product/ProductGridSingle";
import { setCurrentProducts } from "../../store/products/product.action";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../api/productApi";
import { selectCurrentProducts } from "../../store/products/product.selector";

// const ProductGrid = ({ eventKey, Number }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log(eventKey);
//     const fetchData = async () => {
//       try {
//         GetAllProducts().then((res) => {
//           dispatch(setCurrentProducts(res.data.products));
//         });
//       } catch (error) {
//         // console.log(error.message);
//       }
//     };
    

//     fetchData();
//   }, []);

//   const currentProducts = useSelector(selectCurrentProducts);

//   return (
//     <Fragment>
//       {currentProducts &&
//         currentProducts.slice(0, Number).map((product, index) => {
//           return <ProductGridSingle product={product} key={index} />;
//         })}
//     </Fragment>
//   );
// };

console.log('test2 : ');

// const ProductGrid = ({ eventKey, Number }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         GetAllProducts().then((res) => {
//           dispatch(setCurrentProducts(res.data.products));
//         });
//       } catch (error) {
//         // Handle error
//       }
//     };

//     fetchData();
//   }, []);

//   const currentProducts = useSelector(selectCurrentProducts);
//   console.log("currentProducts", currentProducts); // Add this line to log the structure

//   return (
//     <Fragment>
//       {currentProducts && currentProducts.currentProducts && // Access currentProducts property
//         currentProducts.currentProducts.slice(0, Number).map((product, index) => {
//           return <ProductGridSingle product={product} key={index} />;
//         })}
//     </Fragment>
//   );
// };

const ProductGrid = ({ eventKey, Number }) => {
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
<<<<<<< HEAD
  const currentProductsNow = currentProducts.currentProducts
  // console.log("currentProducts", currentProductsNow);

  return (
    <Fragment>
      {Array.isArray(currentProductsNow) &&
        currentProductsNow.slice(0, Number).map((product, index) => (
=======

  console.log("currentProducts", currentProducts.currentProducts);
  const displayProducts = currentProducts.currentProducts;

  return (
    <Fragment>
      {Array.isArray(displayProducts) &&
        displayProducts.slice(0, Number).map((product, index) => (
>>>>>>> yassirShopChange
          <ProductGridSingle product={product} key={index} />
        ))}
    </Fragment>
  );
};





export default ProductGrid;
