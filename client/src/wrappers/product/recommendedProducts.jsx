import React, { Fragment, useEffect } from "react";
import ProductGridSingle from "../../components/shop/product/ProductGridSingle";
import { setCurrentProducts, setRecommendedProducts } from "../../store/products/product.action";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../api/productApi";
import { selectCurrentProducts } from "../../store/products/product.selector";

// const RecommendedProducts = ({ Number, activeTab }) => {
//     const dispatch = useDispatch();

//     const fetchData = async () => {
//         try {
//             GetAllProducts().then((res) => {
//                 dispatch(setRecommendedProducts(res.data.products));
//             });
//         } catch (error) {
//             // console.log(error.message);
//         }
//     };

//     // useEffect(() => {
//     //     fetchData();
//     // }, [activeTab]);

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
//             {console.log("recom", currentProducts)}
//         </Fragment>
//     );
// };

// export default RecommendedProducts;

const RecommendedProducts = ({ Number, activeTab }) => {
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            GetAllProducts().then((res) => {
                dispatch(setRecommendedProducts(res.data.products));
            });
        } catch (error) {
            // console.log(error.message);
        }
    };

    useEffect(() => {
        console.log(activeTab);
        if (activeTab) {
            fetchData();
        }
    }, [activeTab]);

    const { recommended } = useSelector(selectCurrentProducts);
   


    return (
        <Fragment>
            {Array.isArray(recommended) &&
                recommended.slice(0, Number).map((product, index) => (
                    <ProductGridSingle product={product} key={index} />
                ))}
        </Fragment>
    );
};

export default RecommendedProducts;
