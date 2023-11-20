import React, { useEffect } from 'react';
import { Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/system';

import { GetOneProduct } from '../../../api/productApi';
import { ProductsC } from '../../../context/shopContext/productContext';
import { CartC } from '../../../context/shopContext/cartContext';

import BodyPartImage from '../../../assets/body-part.png';
import Loader from '../loader/Loader';
import Image from '../../../assets/HeroImage.jpg';

// Styled components
const DetailImage = styled('img')({
  width: '729px',
  height: '500px',
});

const ProductCardDetails = ({ id }) => {
  const { productDetail, setProductDetail } = ProductsC();
  const { addItemToCart } = CartC();

  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await GetOneProduct(id);
      const productDetailData = response.data.data;

      setProductDetail(productDetailData);
    };

    fetchProductDetail();
  }, [id]);

  const addProductToCart = () => {
    addItemToCart(productDetail);
  };

  return (
    <>
      {productDetail ? (
        <Stack gap="60px" sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>
          <DetailImage src={productDetail.productImages[0] || Image} alt="product-name" loading="lazy" />
          <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
            <Typography sx={{ fontSize: { lg: '64px', xs: '30px' } }} fontWeight={700} textTransform="capitalize">
              {productDetail.productName}
            </Typography>

            <Typography sx={{ fontSize: { lg: '24px', xs: '18px' } }} color="#4F4C4C">
              This is the description of the product <br />
            </Typography>

            <Stack key={1212} direction="row" gap="24px" alignItems="center">
              <Button sx={{ background: '#FFF2DB', borderRadius: '50%', width: '100px', height: '100px' }}>
                <img src={BodyPartImage} alt="nasss" style={{ width: '50px', height: '50px' }} />
              </Button>
              <Typography textTransform="capitalize" sx={{ fontSize: { lg: '30px', xs: '20px' } }}>
                Price: $ {productDetail.price}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              color="error"
              sx={{ backgroundColor: '#e3a346', padding: '10px' }}
              onClick={addProductToCart}
            >
              Add To cart
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductCardDetails;
