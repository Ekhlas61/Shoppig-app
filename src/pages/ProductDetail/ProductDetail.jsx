import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import { Rating } from "@mui/material";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
// import classes from './ProductDetail.module.css'

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]); // ✅ add dependency

  if (loading)
    return (
      <LayOut>
        <p style={{ padding: "20px" }}>Loading...</p>
      </LayOut>
    );
  if (error)
    return (
      <LayOut>
        <p style={{ padding: "20px", color: "red" }}>Error: {error}</p>
      </LayOut>
    );
  if (!product)
    return (
      <LayOut>
        <p style={{ padding: "20px" }}>No product found.</p>
      </LayOut>
    );

  return (
    <LayOut>
      <div style={{ display: "flex", gap: "30px", padding: "30px" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "250px", objectFit: "contain" }}
        />
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Rating value={product.rating?.rate} precision={0.1} readOnly />
            <small>({product.rating?.count} reviews)</small>
          </div>
          <strong
            style={{ fontSize: "20px", display: "block", margin: "10px 0" }}
          >
            <CurrencyFormat amount={product.price} />
          </strong>
          <button style={{ padding: "10px 20px", cursor: "pointer" }}>
            Add to Cart
          </button>
        </div>
      </div>
    </LayOut>
  );
};

export default ProductDetail;
