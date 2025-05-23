import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./PaymentPaid.css";
import { assets } from "../../assets/assets";
import FakeSMS from "../Fakesms";

 

const PaymentPaid = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [showSMS, setShowSMS] = useState(true);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const nameFromStorage = localStorage.getItem("name");
    if (nameFromStorage) setUserName(nameFromStorage);

    const timer = setTimeout(() => {
      setShowSMS(false); // auto hide after 4s
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="paymentverify">
      {/* 📩 Popup message on top */}
      {showSMS && <FakeSMS name={userName} orderId={reference} />}

      <img src={assets.tick} alt="success" />
      <h1>Order Successful</h1>
      <p>Reference No. {reference}</p>
    </div>
  );
};

export default PaymentPaid;
