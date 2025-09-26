import React, { useContext, useState } from "react";
import Layout from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataContext";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      console.log("🚀 Starting payment...");
      console.log("User:", user);
      console.log("Basket:", basket);

      // 1. Get client secret from backend
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${ Math.round(total * 100)}`,
      });

      const clientSecret = response.data?.clientSecret;
      console.log(" Client Secret received:", clientSecret);

      if (!clientSecret) {
        throw new Error("No client secret received from backend.");
      }

      // 2. Confirm card payment on client
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        throw new Error("Stripe payment failed: " + error.message);
      }

      console.log(" PaymentIntent result:", paymentIntent);

      // Only continue if payment succeeded
      if (paymentIntent.status !== "succeeded") {
        throw new Error(
          `Payment not successful. Status: ${paymentIntent.status}`
        );
      }

      // 3. Save order to Firestore
      try {
        if (!user?.uid) {
          throw new Error("User UID is missing. Make sure user is logged in.");
        }

        await db
          .collection("users")
          .doc(user.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        console.log(" Order saved to Firestore");
      } catch (firestoreError) {
        console.error("🔥 Firestore save failed:", firestoreError);
        alert("Saving order failed: " + firestoreError.message);
        setProcessing(false);
        return; // stop here so we don’t navigate
      }

      // Empty basket + redirect
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      console.log("➡️ Navigating to /orders");
      navigate("/orders", { state: { msg: "You have placed a new Order" } });
    } catch (error) {
      console.error("❌ Payment error:", error);
      alert(error.message || "Something went wrong during payment");
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Addis Ababa, Ethiopia</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard
                key={item.id || item._id || item.name}
                product={item}
                flex={true}
              />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
