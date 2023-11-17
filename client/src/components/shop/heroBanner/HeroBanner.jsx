import React from 'react';
import {Box, Stack, Typography, Button } from "@mui/material"
import HeroBannerImage from '../../../assets/HeroImage.jpg'
import './HeroBanner.css'
const HeroBanner = () => {
  return (
    <Box sx={{
      mt: { lg: " 44px", xs:"80px"},
      ml: { sm: "50px"}
    }} position="relative" p="20px">
      <Typography color="#e3a346" fontWeight="600" fontSize="30px">
        Morroco Craft
      </Typography>

      <Typography fontWeight={700} sx={{fontSize : {lg:"44px", xs:"24px"}}}  mt='20px' mb='30px'>
            Discover the Timeless <br /> Elegance of Moroccan <br /> Craftsmanship 
      </Typography>

      <Typography  sx={{fontSize: {lg:"22px", xs:"16px"}}} mb={3}>
          Explore a curated collection <br />  of handcrafted treasures, <br /> blending tradition and artistry.
      </Typography>

      <Button 
         variant="contained" 
         color="error"
         sx={{ backgroundColor:'#e3a346', padding:'10px'}}
        //  to="/shop/products"
         >
        Shop Now
      </Button>

      <Typography 
         fontWeight={600}
         color='#e3a346'
         sx={{
           opacity: 0.2,
           display:{ lg: 'block', xs:'none'}
         }}
         mt= '-55px'
         ml = '503px'
         fontSize='141px'
      >
        ARTISANA 
      </Typography>

      <img src={HeroBannerImage} alt="banner" className='hero-banner-img' />
      
    </Box>
  )
}

export default HeroBanner
