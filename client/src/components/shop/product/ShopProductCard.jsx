import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "../../../assets/HeroImage.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartC } from "../../../context/shopContext/cartContext";

// Styled components
const ProductCardContainer = styled(Card)({
  width: 400,
  borderRadius: "10px",
  margin: "20px",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const PriceTypography = styled(Typography)({
  color: "#000",
  fontWeight: "bold",
  fontSize: {
    lg: "24px",
    xs: "20px",
  },
  marginTop: "11px",
  paddingBottom: "10px",
  textTransform: "capitalize",
});

const StyledButton = styled(Button)(({ theme }) => ({
  background: "#FFA9A9",
  fontSize: "14px",
}));

const ShopProductCard = ({ product }) => {
  const { addItemToCart } = CartC();

  const handleAddToCart = () => {
    addItemToCart(product);
    toast.success(`${product.productName} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  let linkSrc = product.productImages[0];

  return (
    <>
      <ProductCardContainer>
        <CardActionArea component={Link} to={`/shop/products/${product._id}`}>
          <CardMedia
            component="img"
            alt={product.productName}
            height="140"
            image={linkSrc && linkSrc.replace(".jpg", ".webp") || Image}
            loading="lazy"
          />
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                {product.productName}
              </Typography>
              <PriceTypography variant="body2" color="text.secondary">
                ${product.price}
              </PriceTypography>
            </Stack>
          </CardContent>
        </CardActionArea>
        <Stack direction="row" justifyContent="space-between" padding="16px">
          <StyledButton sx={{ background: "#FFA9A9", fontSize: "14px" }}>
            {product.quantity}
          </StyledButton>
          <StyledButton sx={{ background: "#FCC757", fontSize: "14px" }} onClick={handleAddToCart}>
            Add to Cart
          </StyledButton>
        </Stack>
      </ProductCardContainer>
      <ToastContainer />
    </>
  );
};

export default ShopProductCard;
