import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from '../ProductCard/ProductCard'
import classes from './Products.module.css'

const Products = () => {
  const [products, setProducts] = useState()

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <section className={classes.products_container}>
      {
        products?.map((singleProduct) => {
          return <ProductCard product={singleProduct} key={singleProduct.id} />
        })
      }
    </section>
  )
}

export default Products
