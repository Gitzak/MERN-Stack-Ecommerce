import React from 'react';
import { Box, Stack, Typography, Button, styled } from "@mui/material";
import HeroBannerImage from '../../../assets/HeroImage.jpg';
import { Link } from 'react-router-dom';

// Styled components
const HeroBox = styled(Box)({
  mt: { lg: " 44px", xs:"80px"},
  ml: { sm: "50px"},
  position: 'relative',
  padding: '72px',

  '.hero-banner-img': {
    position: 'absolute',
    right: '36px',
    borderRadius: '10px',
    top: '29px',
    width: '646px',
    height: 'auto',
  },
});

const HeroBanner = () => {
  return (
    <HeroBox>
      <Typography color="#e3a346" fontWeight="600" fontSize="30px">
        Morroco Craft
      </Typography>

      <Typography fontWeight={700} sx={{fontSize : {lg:"44px", xs:"24px"}}} mt='20px' mb='30px'>
        Discover the Timeless <br /> Elegance of Moroccan <br /> Craftsmanship 
      </Typography>

      <Typography sx={{fontSize: {lg:"22px", xs:"16px"}}} mb={3}>
        Explore a curated collection <br />  of handcrafted treasures, <br /> blending tradition and artistry.
      </Typography>

      <Link  to="/shop/products">
          <Button 
            variant="contained" 
            color="error"
            sx={{ backgroundColor:'#e3a346', padding:'10px'}}
          >
            Shop Now
          </Button>
      </Link>


      <Typography 
        fontWeight={600}
        color='#e3a346'
        sx={{
          opacity: 0.2,
          display: { lg: 'block', xs: 'none'},
          mt: '-108px',
          ml: '615px',
          fontSize: '129px',
        }}
      >
        ARTISANA 
      </Typography>

      <img src={HeroBannerImage} alt="banner" className='hero-banner-img' />
    </HeroBox>
  );
};

export default HeroBanner;
