import { createContext, useContext, useEffect, useState } from "react";
import { GetAllProducts } from "../../api/productApi";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [currentProducts, setCurrentProducts] = useState(null);
    const [productDetail, setProductDetail] = useState(null)
    const [productsError, setProductsError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                GetAllProducts().then((res)=>{
                    setCurrentProducts(res.data.products)  
                })
            } catch (error) {
                setProductsError(error?.response?.message || "An error occurred");
            }
            };
        
            fetchData();
    }, []);

    
    const value = {
        currentProducts,
        setCurrentProducts,
        productDetail,
        setProductDetail
    };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

export const ProductsC = () => {
    const Context = useContext(ProductsContext);
    if (!Context) {
        throw new Error("no context provided");
    }
    return Context;
};
