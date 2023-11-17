import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";
import { ProductsC } from "../../../context/shopContext/productContext";
import ShopProductCard from "../../../components/shop/product/ShopProductCard";
import Loader from "../../../components/shop/loader/Loader";

const Shop = () => {
  const { currentProducts } = ProductsC();
  const [currentPage, setCurrrentPage] = useState(1);

  const productsPerpage = 10;
  const indexOfLastProducts = currentPage * productsPerpage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerpage;

  const paginate = (e, value) => {
    setCurrrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h4" fontWeight="bold" mb="50px">
        All Products
      </Typography>

      <Stack
        direction="row"
        sx={{
          gap: { lg: "50px", xs: "50px" },
          flexWrap: "wrap",
          justifyContent: "center",
          "& > *": {
            flexBasis: { lg: "25%", xs: "50%" },
          },
        }}
      >
        {currentProducts ? (
          currentProducts
            .slice(indexOfFirstProducts, indexOfLastProducts)
            .map((product, index) => (
              <ShopProductCard key={index} product={product} />
            ))
        ) : (
          <Loader />
        )}
      </Stack>

      <Stack mt="100px" alignItems="center">
        {currentProducts && currentProducts.length > 3 && (
          <Pagination
            color="primary"
            shape="rounded"
            count={Math.ceil(currentProducts.length / productsPerpage)}
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
