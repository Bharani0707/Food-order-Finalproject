import React, { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders.");
    }
  };

  // Function to handle order status update

  const statusHandler = async (event, orderId) => {
  try {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });

    if (response.data.message?.toLowerCase().includes("status updated")) {
      toast.success("Order status updated.");
      await fetchAllOrders();
    } else {
      toast.error("Failed to update order status.");
    }
    console.log("Update Response:", response.data);

  } catch (error) {
    console.error("Error updating order status:", error);
    toast.error("Error updating order status.");
  }
};

// Fetch all orders on component mount

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Orders Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={order._id} className="order-item">
              <img src={assets.parcelIcon} alt=""></img>
              <div>
                <p className="order-item-food">
                  {order.items.map((item, idx) => {
                    if (idx === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ", "}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}{" "}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>Rs. {order.amount}</p>
              <select
                className="input1"
                onChange={(event) => statusHandler(event, order._id)}
                defaultValue={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for Delivery</option>
                <option value="Order Delivered">Order Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
