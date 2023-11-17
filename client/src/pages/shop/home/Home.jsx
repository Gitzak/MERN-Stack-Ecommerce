import React from 'react'
import HeroBanner from '../../../components/shop/heroBanner/HeroBanner'
import CollectionSection from '../../../components/shop/collectionSection/CollectionSection'
import ProductsSection from '../../../components/shop/productsSection/ProductsSection'

const Home = () => {
  return (
    <div>
      <HeroBanner/>
      <CollectionSection />
      <ProductsSection/>
    </div>
  )
}

export default Home
