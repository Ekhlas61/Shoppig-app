import React from 'react'
import Carousel from '../Carousel/CarouselEffect'
import Category from '../Category/Category'
import Products from '../Products/Products'
import Layout from '../Layout/Layout'

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
