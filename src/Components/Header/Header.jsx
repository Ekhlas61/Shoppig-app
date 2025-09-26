import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataContext";
import {auth} from '../../Utility/firebase'

const Header = () => {

const[{user,basket}]=useContext(DataContext)
const totalItem = basket?.reduce((amount, item) => {
  return item.amount + amount;
}, 0);
  return (
    <section className={classes.fixed}>
      <header className={classes.header}>
        {/* Logo */}
        <Link to="/" className={classes.logo__container}>
          <img
            src="https://nv-holders.com/wp-content/uploads/2024/08/Amazon-Logo-White@zeevector.png"
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
        <Link to={!user && "/auth"} className={classes.account__container}>
          <div>
            {user ? (
              <>
                <p>Hello {user?.email?.split("@")[0]}</p>
                <span onClick={()=>auth.signOut()}>Sign Out</span>
              </>
            ) : (
              <>
                <p>Hello, sign in</p>
                <span>Account & Lists</span>
              </>
            )}
          </div>
        </Link>

        {/* Orders */}
        <Link to="/orders" className={classes.orders__container}>
          <p>Returns</p>
          <span>& Orders</span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className={classes.cart__container}>
          <BiCart color="white" className={classes.cartIcon} />
          <span>{totalItem}</span>
        </Link>
      </header>
      <LowerHeader />
    </section>
  );
};

export default Header;
