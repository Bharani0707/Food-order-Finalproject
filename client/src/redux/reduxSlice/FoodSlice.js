import { createSlice } from "@reduxjs/toolkit";
import { food_list } from "../../assets/assets";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    food_list,
  },
  reducers: {},
});

export const selectFoodList = (state) => state.food.food_list;
export default foodSlice.reducer;
