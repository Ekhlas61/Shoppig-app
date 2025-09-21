import React, { useState, useEffect } from "react";
import classes from "./Results.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loader from "../../Components/Loader/Loader"; // import your loader

const Results = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${productUrl}/products/category/${categoryName}`
        );
        setResults(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        {isLoading ? (
          <div className={classes.loader_wrapper}>
            <Loader />
          </div>
        ) : (
          <div className={classes.products_container}>
            {results?.map((product, index) => (
              <ProductCard key={product.id || index} product={product} />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Results;
