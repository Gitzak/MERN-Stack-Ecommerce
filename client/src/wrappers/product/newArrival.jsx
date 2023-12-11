import React, { Fragment, useEffect } from "react";
import ProductGridSingle from "../../components/shop/product/ProductGridSingle";
import { setCurrentProducts, setNewArrival } from "../../store/products/product.action";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts, GetNewestProducts } from "../../api/productApi";
import { selectCurrentProducts } from "../../store/products/product.selector";

// const NewArrival = ({ Number, activeTab }) => {
//     const dispatch = useDispatch();

//     const fetchData = async () => {
//         try {
//             GetNewestProducts().then((res) => {
//                 dispatch(setNewArrival(res.data.products));
//             });
//         } catch (error) {
//             // console.log(error.message);
//         }
//     };

//     useEffect(() => {
//         if (activeTab) {
//             fetchData();
//         }
//     }, [activeTab]);

//     // useEffect(() => {
//     //     fetchData();
//     // }, []);

//     const currentProducts = useSelector(selectCurrentProducts);

//     return (
//         <Fragment>
//             {currentProducts &&
//                 currentProducts.slice(0, Number).map((product, index) => {
//                     return <ProductGridSingle product={product} key={index} />;
//                 })}
//             {console.log("new", currentProducts)}
//         </Fragment>
//     );
// };

// export default NewArrival;

const NewArrival = ({ Number, activeTab }) => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      GetNewestProducts().then((res) => {
        dispatch(setNewArrival(res.data.products));
      });
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    if (activeTab) {
      fetchData();
    }
  }, [activeTab]);

  const { newArrival } = useSelector(selectCurrentProducts);

  return (
    <Fragment>
      {Array.isArray(newArrival) &&
        newArrival.slice(0, Number).map((product, index) => (
          <ProductGridSingle product={product} key={index} />
        ))}
    </Fragment>
  );
};

export default NewArrival;
