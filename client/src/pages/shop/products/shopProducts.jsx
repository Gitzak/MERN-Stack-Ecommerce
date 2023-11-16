import React from 'react';
import { useShopData } from '../../../context/shopContext/ProductsContext';

// products from api context

const ShopProducts = () => {
  // console.log('ShopProducts');

  const { products } = useShopData();
  // console.log(products);
    return (
        <>
        <h1>shop Products here</h1>
           {/* map through products */}
           {/* {Array.isArray(products) && products.map((product) => (
        <div key={product._id}>
          <img src={product.productImages} alt={product.productName} />
          <h3>{product.productName}</h3>
          <p>{product.shortDescription}</p>
        </div>
      ))} */}
            {Array.isArray(products.products) && products.products.map((product) => (
    <div key={product._id}>
        {/* Map over all product images */}
        {product.productImages.map((image, index) => (
            <img key={index} src={image} alt={`${product.productName} - Image ${index + 1}`} />
        ))}
        <h3>{product.productName}</h3>
        <p>{product.shortDescription}</p>
    </div>
))}


        </>
    );
}

export default ShopProducts;
