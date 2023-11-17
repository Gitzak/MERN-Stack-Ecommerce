import { useContext } from "react";
import { Box, Typography } from "@mui/material"
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"
import ProductCard from "../productCard/ProductCard";
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';

import './HorizontalScrollBar.css'

const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);
  
    return (
      <Typography onClick={() => scrollPrev()} className="right-arrow">
        <WestIcon/>
      </Typography>
    );
};


const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);
  
    return (
      <Typography onClick={() => scrollNext()} className="left-arrow">
        <EastIcon/>
      </Typography>
    );
  };
  

const HorizontalScrollBar = () => {
  return (
    <ScrollMenu LeftArrow={LeftArrow}  RightArrow={RightArrow}>
         <Box 
             display="flex"
             justifyContent= "space-around"
             overflowX="auto"
             whiteSpace="nowrap"
            //  padding="20px"
             gap="20px" 
             
          >
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
          </Box>
    </ScrollMenu>
  )
}

export default HorizontalScrollBar
