import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  cartItems: [],
};
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ itemId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/cart/add",
        { itemId },
        { headers: { token } }
      );
      console.log("Backend Response:", response.data);

      if (response.data.success) {
        return response.data; // return the response data
      } else {
        // Reject with the error message from the backend
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to add item to cart"
      );
    }
  }
);
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async ({ itemId, token }) => {
    const response = await axios.post(
      "http://localhost:5001/api/cart/remove",
      { itemId },
      { headers: { token } }
    );
    return response.data;
  }
);
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart async actions
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const item = action.payload; // data from backend
        if (item && item._id) {
        const itemIndex = state.cartItems.findIndex((i) => i._id === item._id);
        if (itemIndex >= 0) {
          state.cartItems[itemIndex].quantity += 1;
        } else {
          state.cartItems.push({ ...item, quantity: 1 });
        }
        state.loading = false;
        state.error = null;
      }else{
        state.error = "Invalid item received";
      }
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add item to cart";
      })
      // Remove from cart async actions
      .addCase(removeFromCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        const itemId = action.payload.itemId;
        const itemIndex = state.cartItems.findIndex((i) => i._id === itemId);
        if (itemIndex >= 0) {
          if (state.cartItems[itemIndex].quantity > 1) {
            state.cartItems[itemIndex].quantity -= 1;
          } else {
            state.cartItems.splice(itemIndex, 1);
          }
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove item from cart";
      });
  },
});

export const { addToCart, removeFromCart, getTotalAmount } = CartSlice.actions;
export const { addToCartLocal, removeFromCartLocal } = CartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
export default CartSlice.reducer;
