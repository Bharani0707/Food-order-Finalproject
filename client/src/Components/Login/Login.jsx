import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/reduxSlice/AuthSlice";
import { ToastContainer, toast } from "react-toastify";


const Login = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/login",
        data
      );
      if (response.data.success) {
        dispatch(setToken(response.data.token));
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");

        setTimeout(() => {
          setShowLogin(false); // Close modal after toast
        }, 4000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="login">
      <form onSubmit={onLogin} className="login-container">
        <div className="login-head">
          <h2>Welcome Back!</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-inputs">
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="E-mail"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* Toast container to show notifications */}
      <ToastContainer
        position="top-right"
        autoClose={1900}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false} 
       
        
      />
    </div>
  );
};

export default Login;
