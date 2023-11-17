import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './MainShopLayout.css'
import Footer from '../../../components/shop/footer/Footer'

const MainShopLayout = () => {
  return (
    <div className='shop-container'>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainShopLayout
