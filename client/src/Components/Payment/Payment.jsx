import React from "react";
import axios from "axios";
import config from "../../config"; // ✅ use your config

export const checkoutHandler = async (amount, userId, items, address) => {
  try {
    const {
      data: { key },
    } = await axios.get(`${config.API_BASE_URL}/api/getkey`);

    const {
      data: { order },
    } = await axios.post(`${config.API_BASE_URL}/api/order/checkout`, {
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
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;

        if (!razorpay_signature || !razorpay_order_id) {
          alert("Payment verification may fail.");
          return;
        }

        try {
          const verifyRes = await axios.post(
            `${config.API_BASE_URL}/api/order/paymentverify`,
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
