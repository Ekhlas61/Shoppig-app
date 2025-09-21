import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import LayOut from "../../Components/LayOut/LayOut";
import Loader from "../../Components/Loader/Loader";
import classes from "./ProductDetail.module.css";
import { Rating } from "@mui/material";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${productUrl}/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <LayOut>
        <div className={classes.detail__container}>
          <Loader />
        </div>
      </LayOut>
    );
  }

  if (!product) {
    return (
      <LayOut>
        <div className={classes.detail__container}>
          <p>Product not found</p>
        </div>
      </LayOut>
    );
  }

  return (
    <LayOut>
      <div className={classes.detail__container}>
        <img src={product.image} alt={product.title} />
        <div>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <div>
            <Rating
              value={product.rating?.rate || 0}
              precision={0.1}
              readOnly
            />
            <small>({product.rating?.count} reviews)</small>
          </div>
          <CurrencyFormat amount={product.price} />
          <button>Add to Cart</button>
        </div>
      </div>
    </LayOut>
  );
};

export default ProductDetail;
