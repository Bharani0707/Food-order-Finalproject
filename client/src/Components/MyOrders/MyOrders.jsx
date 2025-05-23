import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import FakeSMS from "../Fakesms";
import config from '../../config';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [showSMS, setShowSMS] = useState(false);
  const [lastOrderId, setLastOrderId] = useState("");
  const [userName, setUserName] = useState("User");

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/order/user`, {
        headers: { token },
      });
      if (response.data && Array.isArray(response.data.orders)) {
        const orders = response.data.orders;
        setData(orders);

        if (orders.length > 0) {
          const lastOrder = orders[orders.length - 1];
          setLastOrderId(lastOrder._id || "ORD123456");
          setShowSMS(true);
        }
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

    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <div className="container">
        {showSMS && <FakeSMS name={userName} orderId={lastOrderId} />}

        {data.map((order, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
