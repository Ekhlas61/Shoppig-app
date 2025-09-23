import React, { useContext } from "react";
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataContext";
import { Type } from "../../Utility/action.type";

const ProductCard = ({ product, renderAdd = true }) => {
  const { image, title, id, rating, price } = product;
  const [, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price },
    });
  };

  return (
    <div className={classes.product}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>

      <div>
        <h3>{title}</h3>
      </div>

      <div className={classes.rating}>
        <Rating value={rating?.rate || 0} precision={0.1} readOnly />
        <small>{rating?.count || 0}</small>
      </div>

      <div>
        <CurrencyFormat amount={price} />
      </div>

    
      {renderAdd && <button onClick={addToCart}>Add to cart</button>}
    </div>
  );
};

export default ProductCard;
