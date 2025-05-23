import React from "react";
import axios from "axios";

export const checkoutHandler = async (amount, userId, items, address) => {
  try {
    const {
      data: { key },
    } = await axios.get("http://localhost:5001/api/getkey");
    const {
      data: { order },
    } = await axios.post("http://localhost:5001/api/order/checkout", {
      amount,
      userId,
      items,
      address,
    });

    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "Food Delivery Website",
      description: "Test Transaction",
      image: "./images/Logo.FDW.png",
      order_id: order.id,
      handler: async function (response) {
        console.log(
          "Payment successful, full response from Razorpay:",
          response
        );
        const razorpay_payment_id = response.razorpay_payment_id;
        const razorpay_order_id = response.razorpay_order_id;
        const razorpay_signature = response.razorpay_signature;
        try {
          if (!razorpay_signature || !razorpay_order_id) {
            console.error("Razorpay signature or order ID is missing");
            alert("Payment verification may fail.");
            return;
          }

          const verifyRes = await axios.post(
            "http://localhost:5001/api/order/paymentverify",
            {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              userId,
              items,
              address,
              amount,
            },
            { headers: { "Content-Type": "application/json" } }
          );
          console.log("Verify Response:", verifyRes.data);

          if (verifyRes.data.success) {
            window.location.replace(
              `/paymentverify?reference=${razorpay_payment_id}`
            );
          } else {
            alert("Payment verification failed. Please try again.");
          }
        } catch (err) {
          console.error("Verification failed:", err);
          alert("There was an error verifying your payment. Please try again.");
        }
      },
      prefill: {
        name: "bharanikumar R",
        email: "Bharanikumar843@gmail.com",
        contact: "+91 9363343197",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#FFFDFE",
      },
    };

    const rz = new window.Razorpay(options);
    rz.open();
  } catch (error) {
    console.error("Error during payment process:", error);
    alert("There was an error processing your payment. Please try again.");
  }
};
const Payment = () => {
  return <div></div>;
};

export default Payment;
