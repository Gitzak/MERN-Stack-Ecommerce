import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 JSM ARTISANA MOROCO <br /> All rights reserverd</p>
      <p className="icons">
        <InstagramIcon />
        <InstagramIcon />
        <TwitterIcon />
        <TwitterIcon />
      </p>
    </div>
  )
}

export default Footer