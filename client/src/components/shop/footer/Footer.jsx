import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        color: '#324d67',
        textAlign: 'center',
        marginTop: '20px',
        padding: '30px 10px',
        fontWeight: 700,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'center',
      }}
    >
      <Typography>
        2023 JSM ARTISANA MOROCO <br /> All rights reserved
      </Typography>
      <Box
        className="icons"
        sx={{
          fontSize: '30px',
          display: 'flex',
          gap: '30px',
        }}
      >
        <InstagramIcon />
        <InstagramIcon />
        <TwitterIcon />
        <TwitterIcon />
      </Box>
    </Box>
  );
};

export default Footer;
