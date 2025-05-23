import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Import backend URL from config.js
import config from "../config";
const url = config.API_BASE_URL;

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error loading food items");
      }
    } catch (error) {
      toast.error("Failed to fetch food list");
      console.error(error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      await axios.post(`${url}/api/food/remove`, { id: foodId });
      await fetchList();
    } catch (error) {
      toast.error("Failed to remove food item");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          const imagePath = item.image.replace(/\\/g, "/").replace("Uploads/", "");
          return (
            <div key={index} className="list-table-format">
              <img
                src={`${url}/images/${imagePath}`} // ✅ also use live image path
                alt="Food Item"
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>Rs {item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
