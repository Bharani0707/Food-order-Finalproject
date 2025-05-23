import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./PaymentPaid.css";
import { assets } from "../../assets/assets";
import FakeSMS from "../Fakesms";

const PaymentPaid = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference"); // ⛔️ can be null

  const [showSMS, setShowSMS] = useState(true);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const nameFromStorage = localStorage.getItem("name");
    if (nameFromStorage?.trim()) {
      setUserName(nameFromStorage);
    }

    const timer = setTimeout(() => {
      setShowSMS(false); // Hide SMS after 5s
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="paymentverify">
      {/* ✅ Only show SMS if reference exists */}
      {showSMS && reference && <FakeSMS name={userName} orderId={reference} />}

      <img src={assets.tick} alt="success" />
      <h1>Order Successful</h1>
      {reference ? (
        <p>Reference No. <b>{reference}</b></p>
      ) : (
        <p style={{ color: "red" }}>No reference ID found.</p>
      )}
    </div>
  );
};

export default PaymentPaid;
