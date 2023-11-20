import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { CartC } from "../../../context/shopContext/cartContext";

const CheckoutItem = ({ cartItem }) => {
  const { addItemToCart, decreaseItemQuantity, clearItemFromCart } = CartC();

  const addHandler = () => addItemToCart(cartItem);
  const decreaseHandler = () => decreaseItemQuantity(cartItem);
  const clearHandler = () => clearItemFromCart(cartItem);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        minHeight: "100px",
        borderBottom: "1px solid darkgrey",
        padding: "15px 0",
        fontSize: "20px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "23%",
          paddingRight: "15px",
        }}
      >
        <img
          src={cartItem.productImages[0]}
          alt={`${cartItem.productName}`}
          style={{ width: "100%", height: "100px" }}
        />
      </Box>

      <Typography className='name' sx={{ width: "23%" }}>
        {cartItem.productName}
      </Typography>

      <Box
        className='quantity'
        sx={{ width: "23%", display: "flex", alignItems: "center" }}
      >
        <IconButton className='arrow' onClick={decreaseHandler}>
          <RemoveIcon />
        </IconButton>
        <Typography className='value'>{cartItem.quantity}</Typography>
        <IconButton className='arrow' onClick={addHandler}>
          <AddIcon />
        </IconButton>
      </Box>

      <Typography className='price' sx={{ width: "23%" }}>
        {cartItem.price}
      </Typography>

      <IconButton className='remove-button' onClick={clearHandler}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CheckoutItem;
