// Shop component
import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { ProductsC } from "../../../context/shopContext/product/productContext";
import ShopProductCard from "../../../components/shop/product/ShopProductCard";
import Loader from "../../../components/shop/loader/Loader";

const Shop = () => {
  const { currentProducts } = ProductsC();
  const [currentPage, setCurrrentPage] = useState(1);

  const productsPerRow = 3;
  const productsPerPage = 10;
  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;

  const paginate = (e, value) => {
    setCurrrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px 100px 20px 250px">
      <Typography variant="h4" fontWeight="bold" mb="50px">
        All Products
      </Typography>

      <Grid container spacing={2}>
        {currentProducts ? (
          currentProducts
            .slice(indexOfFirstProducts, indexOfLastProducts)
            .map((product, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                <ShopProductCard product={product} />
              </Grid>
            ))
        ) : (
          <Loader />
        )}
      </Grid>

      <Stack mt="100px" alignItems="center">
        {currentProducts && currentProducts.length > productsPerPage && (
          <Pagination
            color="primary"
            shape="rounded"
            count={Math.ceil(currentProducts.length / productsPerPage)}
            defaultPage={1}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Shop;
