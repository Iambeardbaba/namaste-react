import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // Check if item already exists
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // If item exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // If new item, add with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem && existingItem.quantity > 1) {
        // If quantity > 1, decrease quantity
        existingItem.quantity -= 1;
      } else {
        // If quantity = 1, remove item completely
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
