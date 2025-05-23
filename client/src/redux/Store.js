import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./reduxSlice/FoodSlice";
import cartReducer from "./reduxSlice/CartSlice";
import authReducer from "./reduxSlice/AuthSlice";

const Store = configureStore({
  reducer: {
    food: foodReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
export default Store;
