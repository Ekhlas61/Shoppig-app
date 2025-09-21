import React from 'react'
import Carousel from '../../Components/Carousel/CarouselEffect'
import Category from '../../Components/Category/Category'
import Products from '../../Components/Products/Products'
import Layout from '../../Components/LayOut/LayOut'

function Landing() {
  return (
    <Layout>
      <Carousel />
      <Category />
      <Products />
    </Layout>
  )
}

export default Landing
