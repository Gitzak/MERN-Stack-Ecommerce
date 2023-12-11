import React, { Fragment, useEffect } from "react";
import ProductGridSingle from "../../components/shop/product/ProductGridSingle";
import { setBestSeller, setCurrentProducts } from "../../store/products/product.action";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts, GetBestSeller } from "../../api/productApi";
import { selectCurrentProducts } from "../../store/products/product.selector";


// const BestSeller = ({ Number, activeTab }) => {
//     const dispatch = useDispatch();

//     const fetchData = async () => {
//         try {
//             GetBestSeller().then((res) => {
//                 dispatch(setBestSeller(res.data.products));
//             });
//         } catch (error) {
//             // handle error
//         }
//     };

//     useEffect(() => {
//         if (activeTab) {
//             fetchData();
//         }
//     }, [activeTab]);

//     // Update the selector to use the new one for the bestSeller tab
//     const { bestSeller } = useSelector(selectCurrentProducts);

//     return (
//         <Fragment>
//             {bestSeller &&
//                 bestSeller.slice(0, Number).map((product, index) => {
//                     return <ProductGridSingle product={product} key={index} />;
//                 })}
//             {console.log("bast", bestSeller)}
//         </Fragment>
//     );
// };

// export default BestSeller;

const BestSeller = ({ Number, activeTab }) => {
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            GetBestSeller().then((res) => {
                dispatch(setBestSeller(res.data.products));
            });
        } catch (error) {
            // handle error
        }
    };

    useEffect(() => {
        if (activeTab) {
            fetchData();
        }
    }, [activeTab]);

    const { bestSeller } = useSelector(selectCurrentProducts);

    return (
        <Fragment>
            {Array.isArray(bestSeller) &&
                bestSeller.slice(0, Number).map((product, index) => (
                    <ProductGridSingle product={product} key={index} />
                ))}
                {console.log('best seller',bestSeller)}
        </Fragment>
    );
};

export default BestSeller;
