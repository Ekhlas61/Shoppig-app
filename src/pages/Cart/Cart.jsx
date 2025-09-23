import React, { useContext } from "react";
import Layout from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataContext";
import ProductCard from "../../Components/ProductCard/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";

function Cart() {
  const [{ basket }] = useContext(DataContext);

  const total = basket.reduce((amount, item) => item.price *item.amount + amount, 0);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket.length === 0 ? (
            <p>Oops! No item in your cart</p>
          ) : (
            basket.map((item, i) => (
              <ProductCard
                key={i}
                product={item}
                renderAdd={false} // ✅ hides add button
              />
            ))
          )}
        </div>

        {basket.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
