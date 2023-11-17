import { Stack, Typography } from "@mui/material";
import HeroBannerImage from '../../../../assets/HeroImage.jpg';
import './ProductCard.css';

const ProductCard = () => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="product-card"
      sx={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        width: '200px', // Adjust the width based on your design
        height: '250px', // Adjust the height based on your design
        cursor: 'pointer',
        padding: '20px',
        margin: '0 10px', // Add margin for spacing between cards
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth
      }}
      onClick={() => {
        // Handle click event if needed
      }}
    >
      <img src={HeroBannerImage} alt="Product" style={{ width: '100%', height: '100%', marginBottom: '1px' }} />
      <Typography fontSize="18px" fontWeight="bold" textAlign="center">
        Product Name
      </Typography>
    </Stack>
  );
};

export default ProductCard;

