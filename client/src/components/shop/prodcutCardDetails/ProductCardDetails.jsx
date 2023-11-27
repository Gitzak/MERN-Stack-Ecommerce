import React, { useEffect, useState } from 'react';
import { Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/system';

import { GetOneProduct } from '../../../api/productApi';
import { ProductsC } from '../../../context/shopContext/product/productContext';
import { CartC } from '../../../context/shopContext/cart/cart.context';

import Loader from '../loader/Loader';
import Image from '../../../assets/HeroImage.jpg';

// Styled components
const DetailImage = styled('img')({
  width: '729px',
  height: '500px',
});

const ProductCardDetails = ({ id }) => {
  const { productDetail, setProductDetail } = ProductsC();
  const {cartItems,  addItemToCart } = CartC();
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await GetOneProduct(id);
      const productDetailData = response.data.data;

      setProductDetail(productDetailData);
    };

    fetchProductDetail();
  }, [id]);



  const handleOptionChange = (optionLabel, selectedValue) => {
    const newSelectedOptions = [...selectedOptions];
    const existingOptionIndex = newSelectedOptions.findIndex((option) => option.label === optionLabel);

    if (existingOptionIndex !== -1) {
      // Update existing option
      const selectedOption = newSelectedOptions[existingOptionIndex];
      const updatedOption = {
        ...selectedOption,
        option: selectedOption.option.includes(selectedValue) ? [] : [selectedValue],
      };
      newSelectedOptions[existingOptionIndex] = updatedOption;
    } else {
      // Add new option
      newSelectedOptions.push({ label: optionLabel, option: selectedValue });
    }

    setSelectedOptions(newSelectedOptions);
  };

  const addProductToCart = () => {
    // Check if the product has options that require selection
    const optionsRequiringSelection = productDetail.options?.filter((option) => option.option.length > 1);

    // Check if any of the required options are not selected
    const unselectedOptions = optionsRequiringSelection?.filter((requiredOption) => {
      const selectedOption = selectedOptions.find((option) => option.label === requiredOption.label);
      return !selectedOption || selectedOption.option.length === 0;
    });

    if (unselectedOptions && unselectedOptions.length > 0) {
      // Display a message or trigger a popup for the user to select options
      alert('Please select options for: ' + unselectedOptions.map((option) => option.label).join(', '));
    } else {
      addItemToCart(productDetail, selectedOptions);
    }
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

              {/* Selectable Options */}
              {productDetail.options && (
                <Stack>
                  {productDetail.options.map((option) => (
                    <div key={option._id}>
                      <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{option.label}</Typography>
                      <Stack direction="row" spacing={1}>
                        {option.option.map((value) => (
                          <Button
                            key={value}
                            variant={selectedOptions.some((selectedOption) =>
                              selectedOption.option.includes(value)
                            )
                              ? 'contained'
                              : 'outlined'
                            }
                            onClick={() => handleOptionChange(option.label, value)}
                          >
                            {value}
                          </Button>
                        ))}
                      </Stack>
                    </div>
                  ))}
                </Stack>
              )}

            <Stack key={1212} direction="row" gap="24px" alignItems="center">
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















































// import React, { useEffect } from 'react';
// import { Typography, Stack, Button } from '@mui/material';
// import { styled } from '@mui/system';

// import { GetOneProduct } from '../../../api/productApi';
// import { ProductsC } from '../../../context/shopContext/productContext';
// import { CartC } from '../../../context/shopContext/cartContext';

// import BodyPartImage from '../../../assets/body-part.png';
// import Loader from '../loader/Loader';
// import Image from '../../../assets/HeroImage.jpg';

// // Styled components
// const DetailImage = styled('img')({
//   width: '729px',
//   height: '500px',
// });

// const ProductCardDetails = ({ id }) => {
//   const { productDetail, setProductDetail } = ProductsC();
//   const { addItemToCart } = CartC();

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       const response = await GetOneProduct(id);
//       const productDetailData = response.data.data;

//       console.log(productDetailData)

//       setProductDetail(productDetailData);
//     };

//     fetchProductDetail();
//   }, [id]);

//   const addProductToCart = () => {
//     addItemToCart(productDetail);
//   };

//   return (
//     <>
//       {productDetail ? (
//         <Stack gap="60px" sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>
//           <DetailImage src={productDetail.productImages[0] || Image} alt="product-name" loading="lazy" />
//           <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
//             <Typography sx={{ fontSize: { lg: '64px', xs: '30px' } }} fontWeight={700} textTransform="capitalize">
//               {productDetail.productName}
//             </Typography>

//             <Typography sx={{ fontSize: { lg: '24px', xs: '18px' } }} color="#4F4C4C">
//               This is the description of the product <br />
//             </Typography>

//             <Stack key={1212} direction="row" gap="24px" alignItems="center">
//               <Typography textTransform="capitalize" sx={{ fontSize: { lg: '30px', xs: '20px' } }}>
//                 Price: $ {productDetail.price}
//               </Typography>
//             </Stack>


//             {/* map here  */}
 
//             <Button
//               variant="contained"
//               color="error"
//               sx={{ backgroundColor: '#e3a346', padding: '10px' }}
//               onClick={addProductToCart}
//             >
//               Add To cart
//             </Button>
//           </Stack>
//         </Stack>
//       ) : (
//         <Loader />
//       )}
//     </>
//   );
// };

// export default ProductCardDetails;
