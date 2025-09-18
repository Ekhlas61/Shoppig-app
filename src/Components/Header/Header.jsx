import React from "react";
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
        <a href="#" className={classes.logo__container}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg"
            alt="Amazon Logo"
            style={{ height: "30px", objectFit: "contain" }}
          />
        </a>

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
        <div className={classes.account__container}>
          <p>Hello, sign in</p>
          <span>Account & Lists</span>
        </div>

        {/* Orders */}
        <div className={classes.orders__container}>
          <p>Returns</p>
          <span>& Orders</span>
        </div>

        {/* Cart */}
        <div className={classes.cart__container}>
          <BiCart className={classes.cartIcon} />
          <span>0</span>
        </div>
      </header>
      <LowerHeader />
    </>
  );
};

export default Header;
