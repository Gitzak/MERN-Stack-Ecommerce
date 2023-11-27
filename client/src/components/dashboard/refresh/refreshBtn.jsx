import React from "react";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

const RefreshButton = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      size="large"
      sx={{ mb: 2, pt: 1, color: "primary.main" }}
    >
      <RefreshIcon />
    </IconButton>
  );
};

export default RefreshButton;
