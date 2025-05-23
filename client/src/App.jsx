import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Home/Cart/Cart";
import Placeorder from "./pages/Home/Placeorder/Placeorder";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import PaymentPaid from "./Components/Payment/PaymentPaid";
import MyOrders from "./Components/MyOrders/MyOrders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignUp] = useState(false);

  return (
    <div className="app">
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      {showSignup ? <SignUp setShowSignUp={setShowSignUp} /> : <></>}
      <Navbar setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Placeorder />} />
        <Route path="/paymentverify" element={<PaymentPaid />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
    </div>
  );
};

export default App;
