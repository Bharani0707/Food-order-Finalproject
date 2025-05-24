import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import FakeSMS from "../Fakesms";
import config from "../../config";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showSMS, setShowSMS] = useState(false);
  const [lastOrderId, setLastOrderId] = useState("");
  const [userName, setUserName] = useState("User");

  const fetchOrders = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?._id;

      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const response = await axios.post(
        `${config.API_BASE_URL}/api/order/userorders`,
        { userId }
      );

      if (response.data && Array.isArray(response.data.orders)) {
        const fetchedOrders = response.data.orders;
        setOrders(fetchedOrders);

        if (fetchedOrders.length > 0) {
          const lastOrder = fetchedOrders[fetchedOrders.length - 1];
          setLastOrderId(lastOrder._id || "ORD123456");
          setShowSMS(true);
        }
      } else {
        console.warn("No orders received from backend");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    const nameFromStorage = localStorage.getItem("name");
    if (nameFromStorage && nameFromStorage.trim() !== "") {
      setUserName(nameFromStorage);
    }

    fetchOrders(); // Call fetch on load
  }, []);

  return (
    <div className="my-orders">
      <div className="container">
        {showSMS && <FakeSMS name={userName} orderId={lastOrderId} />}

        {orders.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "18px" }}>
            You have no orders yet.
          </p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p>
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p>Rs. {order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p className="status">
                <span>&#x25cf;</span>
                <b>{order.status}</b>
                <button onClick={fetchOrders}>Track Order</button>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
