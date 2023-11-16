import { createContext, useContext, useEffect, useState } from "react";
import { getProduct } from "../../api/shopApi/productsApi";
import ShopLayout from "../../layouts/ShopLayout";



const ProductContext = createContext();
export const ProductData = () => useContext(ProductContext);


export const useShopData = () => {
    const context = useContext(ProductContext);
    if (!context) {
      throw new Error("useShopData must be used within a ShopWrapper");
    }
    return context;
  };



export const ShopWrapper = ({children}) => {

    const [products, setProducts] = useState([]);
   

    useEffect(() => {
        // Fetch products when the component mounts
        getProduct({/* your query params */})
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            console.error('Error fetching products:', error);
          });
      }, []); // Empty dependency array ensures it only runs once on mount

      

    return (
        <ProductContext.Provider value={{ products}}>
            <>
            {children}
            </>
        </ProductContext.Provider>
    );
};
