import { Card, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styled components
export const ProductCardContainer = styled(Card)({
  width: 300,
  height: 400,
  borderRadius: "10px",
  margin: "10px",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export const PriceTypography = styled(Typography)({
  color: "#000",
  fontWeight: "bold",
  fontSize: {
    lg: "24px",
    xs: "20px",
  },
  marginTop: "5px",
  paddingBottom: "5px",
  textTransform: "capitalize",
});
