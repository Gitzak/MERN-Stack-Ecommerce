import React from 'react';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { CartC } from '../../../context/shopContext/cartContext';
import CheckoutItem from '../../../components/shop/checkoutItem/CheckoutItem';
import { createNewOrder } from '../../../api/orderApi';
import Swal from "sweetalert2";

const Checkout = () => {
  const { cartItems, cartTotal } = CartC();

  const HandleNewOrder = async () => {
    const sendedOrder = cartItems.map(cartItem => ({
      productId: cartItem._id,
      quantity: cartItem.quantity,
      itemOptions: []
    }));
    try {
      console.log(sendedOrder)
      const newOrder = await createNewOrder(sendedOrder);
      console.log(newOrder);
    } catch (error) {
      console.log(error.message);
      if (error.response.data.status) {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: error.response.data.message,
            confirmButtonText: "OK",
            customClass: {
                container: "swal2-container",
            },
            didOpen: () => {
                document.querySelector(".swal2-container").style.zIndex = 10000;
            },
        }).then(() => {
            // refresh
            fetchProducts();
        });
    }
    }
  }

  return (
    <Container component="div" maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '50px auto 0' }}>
      <Box sx={{ width: '55%', minHeight: '90vh' }}>
        <Box component="div" sx={{ padding: '10px 0', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid darkgrey' }}>
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize', width: '23%' }}>Product</Typography>
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize', width: '23%' }}>Description</Typography>
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize', width: '23%' }}>Quantity</Typography>
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize', width: '23%' }}>Price</Typography>
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize', width: '8%' }}>Remove</Typography>
        </Box>

        {cartItems && cartItems.map((cartItem) => <CheckoutItem key={cartItem._id} cartItem={cartItem} />)}

        <Typography variant="h4" sx={{ marginTop: '30px', marginLeft: 'auto' }}>TOTAL: ${cartTotal}</Typography>
        <Button 
            variant="contained" 
            color="error"
            sx={{ backgroundColor:'#e3a346', padding:'10px'}}
            onClick={HandleNewOrder}
        >
              Send Order
        </Button>
      </Box>
    </Container>
  );
};

export default Checkout;
