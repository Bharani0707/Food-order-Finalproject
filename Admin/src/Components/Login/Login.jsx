import React, { useState } from "react";
import { toast } from "react-toastify";
import "./Login.css"; // Dark theme CSS import

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "Bharani@1" && password === "admin123") {
      toast.success("Login Successful!");
      onLogin();
    } else {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div className="login-wrapper">
          {/* Animated bike */}
  <img
    src="https://cdni.iconscout.com/illustration/premium/thumb/food-delivery-on-motorbike-illustration-download-in-svg-png-gif-file-formats--parcel-deliveryman-goods-and-foods-transportation-pack-people-illustrations-3408206.png"
    alt="bike"
    className="bike-animation"
  />
  
      <div className="login-box">
        
        <div className="login-icon">🔑</div>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <label>EMAIL</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOGIN</button>
          
        </form>
         <div className="login-footer">
            <p>© 2025 Admin Dashboard. All rights reserved.</p>
        </div>
      </div>
       
    </div>
  );
};

export default Login;
