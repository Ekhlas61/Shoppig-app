import React from 'react'
import { Rating } from '@mui/material'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import classes from './ProductCard.module.css'
import {Link} from 'react-router-dom'
const ProductCard = ({ product }) => {
  const { image, title, id, rating, price } = product

  return (
    <div className={classes.product}>
      <Link to ={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
      </div>
      <div className={classes.rating}>
        {/* rating */}
        <Rating value={rating.rate} precision={0.1} />
        {/*count */}
        <small>{rating.count}</small>
      </div>
      <div>
        {/* price */}
        <CurrencyFormat amount={price} />
      </div>
      <button>add to cart</button>
    </div>
  )
}

export default ProductCard
