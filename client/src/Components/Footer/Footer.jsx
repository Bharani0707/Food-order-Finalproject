import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src="./images/Logo.FDW.png" alt=""></img>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
            deleniti debitis totam, similique assumenda doloremque omnis
            repellendus! Odit, dignissimos fugiat neque tempora minus fuga
            animi, dolor corporis labore rerum sequi?
          </p>
          <div className="footer-social-icons">
            <img src="./images/facebook_neon_icon.png" alt=""></img>
            <img src="./images/instagram__pictures_icon.png" alt=""></img>
            <img src="./images/snap_snapchat_icon.png" alt=""></img>
            <img src="./images/social_tweet_icon.png" alt=""></img>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Our Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Orders</li>
            <li>Policies</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>+91 9363343197</li>
            <li>bharanikumar843@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 © Menu Maverick.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
