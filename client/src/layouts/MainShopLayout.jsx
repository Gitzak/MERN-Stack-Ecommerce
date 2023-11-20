import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Navbar from '../pages/shop/Navbar/Navbar';
import Footer from '../components/shop/footer/Footer';
import { Outlet } from 'react-router-dom';

const MainShopLayout = () => {
  return (
    <Container component="div" maxWidth="xl" sx={{ padding: '10px 50px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default MainShopLayout;
