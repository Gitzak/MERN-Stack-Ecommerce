import React from "react";
import { Link } from "react-router-dom";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { ProductCardContainer, PriceTypography } from "./ShopProductCardStyle";
import Image from "../../../assets/HeroImage.jpg";


const ShopProductCard = ({ product }) => {
  let linkSrc = product.productImages[0];
  return (
    <>
      <ProductCardContainer>
        <CardActionArea component={Link} to={`/shop/products/${product._id}`}>
          <CardMedia
            component="img"
            alt={product.productName}
            height="300"
            image={(linkSrc && linkSrc.replace(".jpg", ".webp")) || Image}
            loading="lazy"
          />
          <CardContent sx={{ padding: "5px 25px" }}>
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
      </ProductCardContainer>
    </>
  );
};

export default ShopProductCard;
