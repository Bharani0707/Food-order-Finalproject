import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <>
    <div className="header">
      <img src={"./images/banner.png"} alt="" className="header-bg"></img>
      <div className="header-container">
        <h2>Delicious Food, Right at Your Doorstep!</h2>
        <p>
          Explore our diverse menu: fresh salads, hearty sandwiches, savory
          pasta, gourmet burgers, and delectable desserts. Satisfy every craving
          with our delicious, handcrafted dishes, made to order and delivered
          fast.
        </p>
        <button>Explore Menu</button>
      </div>
    </div>
    </>
  );
};
export default Header;
