import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Image from "../../../assets//HeroImage.jpg";

const CartItem = ({ cartItem }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "80px",
          margin: "20px 0",
        }}
      >
        <img
          src={cartItem.productImages[0] || Image}
          alt="jnaa"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "2px",
          }}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "10px 15px",
          }}
        >
          <Typography sx={{ fontSize: "14px" }} className="name">
            {cartItem.productName}
          </Typography>
          <Typography sx={{ fontSize: "14px" }} className="price">
            {cartItem.quantity} x ${cartItem.price}
          </Typography>
        </Box>
      </Box>
      <Divider style={{ backgroundColor: "#878787" }} />
    </>
  );
};

export default CartItem;
