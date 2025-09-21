import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        {/* Logo */}
        <Link to="/" className={classes.logo__container}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg"
            alt="Amazon Logo"
            style={{ height: "30px", objectFit: "contain" }}
          />
        </Link>

        {/* Delivery */}
        <div className={classes.delivery__container}>
          <SlLocationPin className={classes.icon} />
          <div>
            <p>Deliver to</p>
            <span>Ethiopia</span>
          </div>
        </div>

        {/* Search */}
        <div className={classes.search__container}>
          <select>
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
            <option value="home">Home & Kitchen</option>
          </select>
          <input type="text" placeholder="Search Amazon" />
          <button>
            <BsSearch />
          </button>
        </div>

        {/* Language */}
        <div className={classes.language__container}>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
            alt="USA Flag"
          />
          <select>
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
          </select>
        </div>

        {/* Account */}
        <Link to="/auth" className={classes.account__container}>
          <p>Hello, sign in</p>
          <span>Account & Lists</span>
        </Link>

        {/* Orders */}
        <Link to="/orders" className={classes.orders__container}>
          <p>Returns</p>
          <span>& Orders</span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className={classes.cart__container}>
          <BiCart className={classes.cartIcon} />
          <span>0</span>
        </Link>
      </header>
      <LowerHeader />
    </>
  );
};

export default Header;
