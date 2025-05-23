import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFoodList } from "../../../redux/reduxSlice/FoodSlice";
import "./DisplayMenu.css";
import { assets } from "../../../assets/assets";
import {
  addToCart,
  addToCartAsync,
  removeFromCart,
  selectCartItems,
} from "../../../redux/reduxSlice/CartSlice";
import axios from "axios";

const DisplayMenu = ({ category }) => {
  const dispatch = useDispatch();
  const food_list = useSelector(selectFoodList);
  const cartItems = useSelector(selectCartItems);
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemCount, setItemCounts] = useState({});

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get("");
        setFoodList(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching food data");
        setLoading(false);
      }
    };

    fetchFoodData();
  }, []);

  const filteredFoodList =
    category === "All"
      ? food_list
      : food_list.filter((food) => food.category === category);

  const handleAddItem = async (id, food) => {
    dispatch(addToCart(food));
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
    const token = localStorage.getItem("token");
    await dispatch(addToCartAsync({ itemId: food._id, token }));
  };

  const handleRemoveItem = (id, food) => {
    dispatch(removeFromCart(food));
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[id] > 1) {
        newCounts[id]--;
      } else {
        delete newCounts[id];
      }
      return newCounts;
    });
  };
  const getItemCount = (foodId) => {
    const item = cartItems.find((item) => item._id === foodId);
    return item ? item.quantity : 0;
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h2 className="head-text-menu">
        Our Top <span>Dishes</span>
      </h2>
      <div className="foodDisplay">
        {filteredFoodList.map((food) => (
          <div key={food._id}>
            <div className="food-image-container">
              <img className="image" src={food.image} alt="" />
              {!itemCount[food._id] ? (
                <img
                  className="add"
                  onClick={() => handleAddItem(food._id, food)}
                  src={assets.add_icon_white}
                  alt=""
                ></img>
              ) : (
                <div className="food-item-counter">
                  <img
                    onClick={() => handleRemoveItem(food._id, food)}
                    className="remove"
                    src={assets.remove_icon_red}
                    alt=""
                  ></img>
                  <p>{itemCount[food._id]}</p>
                  <p>{getItemCount[food._id]}</p>
                  <img
                    onClick={() => handleAddItem(food._id, food)}
                    src={assets.add_icon_green}
                    alt=""
                  ></img>
                </div>
              )}
            </div>
            <div className="food-info">
              <h5>{food.name}</h5>
              <p>{food.description}</p>
              <p>Rs. {food.price} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayMenu;
