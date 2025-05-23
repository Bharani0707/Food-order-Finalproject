import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../redux/reduxSlice/AuthSlice";
const Navbar = ({ setShowLogin, setShowSignUp }) => {
  const [menu, setMenu] = useState("Home");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearToken());
    navigate("/");
  };

  return (
    <>
      <div className="navbar-head">
        <p className="text-sm">
          <span>Free Delivery</span> on Orders above Rs. 299
        </p>
        <p className="flex-text-sm">
          <span>Mon-Fri:</span> 8am-11pm, <span> Sat: </span> 8am-12pm
        </p>
        <div className="icons-head">
          <img
            src={"./images/facebook_neon_icon.png"}
            alt=""
            className="social-icon"
          ></img>
          <img
            src={"./images/instagram__pictures_icon.png"}
            alt=""
            className="social-icon"
          ></img>
          <img
            src={"./images/snap_snapchat_icon.png"}
            alt=""
            className="social-icon"
          ></img>
          <img
            src={"./images/social_tweet_icon.png"}
            alt=""
            className="social-icon"
          ></img>
        </div>
      </div>
      <div className="navbar">
        <img src={"./images/Logo.FDW.png"} alt="" className="logo"></img>
        <ul className="navbar-menu">
          <Link to={"/"}>
            <li
              onClick={() => setMenu("Home")}
              className={menu === "Home" ? "active" : ""}
            >
              Home
            </li>
          </Link>
          <a className="menu-scroll" href="#menu">
            <li
              onClick={() => setMenu("Menu")}
              className={menu === "Menu" ? "active" : ""}
            >
              Menu
            </li>
          </a>
          <Link to={"/myorders"}>
            <li
              onClick={() => setMenu("Orders")}
              className={menu === "Orders" ? "active" : ""}
            >
              Orders
            </li>
          </Link>
           <a className="menu-scroll" href="#menu">
            <li
              onClick={() => setMenu("Menu")}
              className={menu === "Menu" ? "active" : ""}
            >
              about
            </li>
          </a>
          <a href="#footer">
            <li
              onClick={() => setMenu("Contact")}
              className={menu === "Contact" ? "active" : ""}
            >
              Contact
            </li>
          </a>
        </ul>
        <div className="navbar-right">
          <div className="navbar-cart">
            <Link to={"/cart"}>
              <img src="./images/Cart_bag.png" alt=""></img>
            </Link>
            {token && cartItems.length > 0 ? <div className="dot"></div> : ""}
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)} className="log-btn">
              Log In
            </button>
          ) : (
            <div className="user-profile">
              <img src={assets.profile} alt=""></img>
              <ul className="user-profile-dropdown">
                <li>
                  <img src={assets.Orders} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.userLogout} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="navbar-btn">
          <button onClick={() => setShowSignUp(true)} className="sign-btn">
            Sign up →
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
