import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import ProductCardDetails from "../../../components/shop/prodcutCardDetails/ProductCardDetails";

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <Box>
      <ProductCardDetails id={id} />
    </Box>
  );
};

export default ProductDetails;

