import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./SignUp.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../config";

const SignUp = ({ setShowSignUp }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSignUp = async (event) => {
    event.preventDefault();

    try {
      // ✅ Corrected API URL
      const response = await axios.post(`${config.API_BASE_URL}/api/user/register`, data);

      if (response.data.success) {
        localStorage.setItem("userData", JSON.stringify(data));
        toast.success("Sign-up successful!");
        setTimeout(() => {
          setShowSignUp(false); // Close the modal after toast
        }, 2000);
      } else {
        toast.error(response.data.message || "Sign-up failed");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error("Sign-up failed. Please try again.");
    }
  };

  return (
    <div className="sign-up">
      <form onSubmit={onSignUp} className="sign-up-container">
        <div className="sign-up-head">
          <h2>Join Us!</h2>
          <img
            onClick={() => setShowSignUp(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="sign-up-inputs">
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Enter Full Name"
            required
          />
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Enter Your E-mail"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Create Password"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        <div className="sign-save">
          <input type="checkbox" />
          <h5>Save login info</h5>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={2000}
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

export default SignUp;
