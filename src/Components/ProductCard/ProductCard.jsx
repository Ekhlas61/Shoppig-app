import React, { useContext } from 'react'
import { Rating } from '@mui/material'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import classes from './ProductCard.module.css'
import {Link} from 'react-router-dom'
import { DataContext } from '../DataProvider/DataContext'
import{Type} from '../../Utility/action.type'
const ProductCard = ({ product }) => {
  const { image, title, id, rating, price } = product

const [,dispatch]=useContext(DataContext)


const addToCart=()=>{
  dispatch({
    type: Type.ADD_TO_BASKET,
    item: { image, title, id, rating, price },
  });
}
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
      <button onClick={addToCart}>add to cart</button>
    </div>
  )
}

export default ProductCard
