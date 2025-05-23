import React, { useEffect, useState } from "react";
import "./Placeorder.css";
import { useSelector } from "react-redux";
import { checkoutHandler } from "../../../Components/Payment/Payment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { food_list } from "../../../assets/assets";

const Placeorder = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subTotal = cartItems.reduce((accumulator, item) => {
    const price = parseFloat(item.price);
    const quantity = parseFloat(item.quantity);
    const total = price * quantity;
    return accumulator + total;
  }, 0);
  const deliveryFee = subTotal > 299 ? 0 : 50;
  const totalAmount = subTotal + deliveryFee;
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  localStorage.setItem("token", token);

  let userId;

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      userId = decodedToken.id;
      if (!userId) {
        alert("User ID not found in the token. Please log in again.");
        navigate("/login");
      } else {
        console.log("User ID:", userId);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      alert("Invalid token. Please login again.");
      navigate("/login");
    }
  } else {
    alert("Please login to place an order.");
    navigate("/login");
  }

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (totalAmount === 0) {
      navigate("/cart");
    }
  }, [token]);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const placeOrder = async (event) => {
    event.preventDefault();
    if (
      !data.firstName ||
      !data.email ||
      !data.street ||
      !data.city ||
      !data.phone
    ) {
      alert("Please fill all required fields.");
      return;
    }
    const orderItems = cartItems.map((cartItem) => {
      const item = food_list.find((item) => item._id === cartItem._id);
      return { ...item, quantity: cartItem.quantity };
    });
    if (!userId) {
      alert("User ID not found. Please login again.");
      return;
    }
    const orderData = {
      userId,
      address: data,
      items: orderItems,
      amount: totalAmount,
    };
    console.log("Order data being sent:", orderData);
    const response = await axios.post(
      "http://localhost:5001/api/order/checkout",
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      const { order } = response.data;
      if (order && order.id) {
        console.log("Order created:", order.id);
        checkoutHandler(totalAmount, userId, orderItems, data);
      } else {
        console.error("Order creation failed, missing order ID");
        alert("Order creation failed.");
      }
    } else {
      alert("Error in processing your request.");
    }
  };
  const handlePaymentClick = () => {
    const orderItems = cartItems.map((cartItem) => {
      const item = food_list.find((item) => item._id === cartItem._id);
      return { ...item, quantity: cartItem.quantity };
    });
    checkoutHandler(totalAmount, userId, orderItems, data);
  };
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (totalAmount === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="Placeorder">
      <div className="place-order-left">
        <p className="heading">Delivery Information</p>
        <div className="customer-info">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email"
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="customer-info">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="customer-info">
          <input
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Pin Code"
          />
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Mobile Number"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Total Amount</h2>
          <div>
            <div className="cart-total-info">
              <p>Subtotal</p>
              <p>Rs. {subTotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-info">
              <p>Delivery Fee</p>
              <p>Rs. {deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-info">
              <b>Total</b>
              <b>Rs. {totalAmount.toFixed(2)} </b>
            </div>
          </div>
          <button onClick={handlePaymentClick}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
