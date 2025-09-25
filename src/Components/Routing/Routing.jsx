import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from '../../pages/Landing/Landing'
import Auth from '../../pages/Auth/Auth'
import Payment from '../../pages/Payment/Payment'
import Orders from '../../pages/Orders/Orders'
import Cart from '../../pages/Cart/Cart'
import Results from '../../pages/Results/Results'
import ProductDetail from '../../pages/ProductDetail/ProductDetail'
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51SAwSoR8xKgDpvm8r52eEqHDepx8NG33LytJi2rkZZuCJgtAUZgEMkjpJbKv1DGFO7Uj1hir3jczYG884A5mUauo00bvjjtCEf"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing
