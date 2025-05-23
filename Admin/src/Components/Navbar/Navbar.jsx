import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="admin-navbar">
      <img className="admin-logo" src={assets.logo} alt="Logo" />
      <h2 style={{ margin: "0 auto", textAlign: "center", flex: 1, color: "white" }}>Welcome to Admin Dashboard!</h2>
      <img className="profile-image" src={assets.profile_image} alt="Profile" />
    </div>
  );
};

export default Navbar;
