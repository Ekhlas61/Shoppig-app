import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from '../ProductCard/ProductCard'
import classes from './Products.module.css'
import Loader from '../Loader/Loader'

const Products = () => {
  const [products, setProducts] = useState()
   const [isLoading,setIsLoading]=useState(false)
  useEffect(() => {
    setIsLoading(true);
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products?.map((singleProduct) => {
            return (
              <ProductCard product={singleProduct} key={singleProduct.id} />
            );
          })}
        </section>
      )}
    </>
  );
}

export default Products
