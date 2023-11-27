import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CartC } from '../../../context/shopContext/cart/cart.context';
import CartItem from '../cartItem/CartItem';

import './RightDrawer.css'


const RightDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const { cartItems, cartCount } = CartC();


  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  const list = (
    <Box
      sx={{
        width: 350,
        height: "100%",
        backgroundColor: '#000000', 
        color: 'white',
        padding: '50px 0'

      }}
    > 
       <div >
        <Typography  sx={{fontSize: {lg:"22px", xs:"16px"}}} mb={3} style={{ textAlign: 'center' }}>
            Selected Products 
        </Typography>
        <div className='cart-dropdown-container'>
            <div className='cart-items' >
              {
                cartItems && cartItems.map(item => <CartItem  key={item._id}  cartItem={item} />)
              }
            
            </div>
        </div>
            <Link to='/shop/checkout'>
                <Button sx={{
                  backgroundColor: 'white',
                  margin: '20px 20px',
                  padding: '7px 30px',
                  '&:hover': {
                    backgroundColor: 'black',
                    border: "1px solid  #ffffff", 
                    color: "#ffffff",
                    transition: 'background-color 0.3s, border-color 0.3s',
                  },
                }}>Checkout </Button>      
            </Link>
      
      </div>
    </Box>
  );

  return (
    <div>
      <div className='shop-icon-container' onClick={toggleDrawer(true)}> 
          <LocalMallOutlinedIcon fontSize="large"/> 
          <span className="selected-product-count">{cartCount || 0}</span>
      </div>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
      >
        {list}
      </Drawer>
    </div>
  );
}

export default RightDrawer;
